import React, { useEffect, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from "axios"
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

const StockValueOverTime = () => {
    const chartRef = useRef(null);
    const [dataSetY,setDataSetY] = useState([])
    const [dataSetX,setDataSetX] = useState([]);
    const data = {
      labels: dataSetX,
      datasets: [
        {
          label: 'stock',
          data: dataSetY,
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          pointStyle: 'circle',
          pointRadius: 10,
          pointHoverRadius: 15,
        }
      ],
    };
  
    const options = {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Stock Levels Over Time",
        },
      },
    };
    
    async function ValueOverTime() {
        try {
            const response = await axios.get(
                "http://localhost:4000/report/stockValueOverTime", {
                    headers: {
                        Authorization: localStorage.getItem("authToken")
                    }
                }
            );
            const data = response.data.data;

            const X = data.map(item => (new Date(item.date)).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Kolkata' }));
            const Y = data.map(item => item.total_stock_value);

            setDataSetX(X);
            setDataSetY(Y);
        } catch (error) {
            console.error("Error getting stock value over time", error);
            alert("Error getting stock value over time");
        }
    }
    useEffect(()=>{
        ValueOverTime();
    },[]);
    return (
        <Line ref={chartRef} data={data} options={options} />
    );
  };
  
  export default StockValueOverTime;