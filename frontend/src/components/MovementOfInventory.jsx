import React, { useEffect, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function MovementOfInventory(){
    const navigate = useNavigate();
    const chartRef = useRef(null);
    const [dataSetY1,setDataSetY1] = useState([])
    const [dataSetY2,setDataSetY2] = useState([])
    const [dataSetX,setDataSetX] = useState([]);
    const data = {
        labels: dataSetX,
        datasets: [
          {
            label: 'restock',
            data: dataSetY1,
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            pointStyle: 'circle',
            pointRadius: 2,
            pointHoverRadius: 5,
          },{
            label: 'sold',
            data: dataSetY2,
            borderColor: 'rgba(0, 156, 123, 1)',
            backgroundColor: 'rgba(0, 156, 123, 0.5)',
            pointStyle: 'circle',
            pointRadius: 2,
            pointHoverRadius: 5,
          }
        ],
    };

    const options = {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Inventory Movement",
          },
        },
      };

      async function getMovementData(){
        try{
            const response = await axios.get(
                "http://localhost:4000/report/inventoryMovement", {
                    headers: {
                        Authorization: localStorage.getItem("authToken")
                    }
                }
            );
            const data = response.data.data;
            const restockMovement = (data.restockMovement).map(item => item.quantity);
            const saleMovement = (data.saleMovement).map(item => item.quantity);
            
            setDataSetY1(restockMovement);
            setDataSetY2(saleMovement);
        }catch(error){
            console.error(error);
            if(error.response.data.message=="jwt expired"){
                localStorage.removeItem("authToken");
                navigate("/");
                return;
            }
        }
      }
      useEffect(()=>{
        getMovementData(); 
        setDataSetX(Array(((dataSetY1.length>dataSetY2.length)?dataSetY1.length:dataSetY2.length)).fill(""))
        },[]);
      useEffect(()=>{
        setDataSetX(Array(((dataSetY1.length>dataSetY2.length)?dataSetY1.length:dataSetY2.length)).fill("")) 
      },[dataSetY1,dataSetY2])
    return(
        <Line ref={chartRef} data={data} options={options} />
    )
}

export default MovementOfInventory;