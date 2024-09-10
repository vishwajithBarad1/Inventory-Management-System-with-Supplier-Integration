import { useState } from "react";
import "../styles/ProductDetails.css"
import axios from "axios"
import { useNavigate } from "react-router-dom";
function OrderDetails({orderId, product_id, quantity, order_date, status, getAllOrders, header, orderPage}){
    const navigate = useNavigate()

    const [showDetail, setShowDetail] = useState(false);

    function handleColor(){
        if(status ==="Status"){
            return "#fff"
        }
        if (status === "Cancelled"){
            return "rgba(255,0,0,0.5)"
        } else{
            return "#228B22"
        }
    }
    function handleMouseEnter(){
        setShowDetail(true);
    }
    function handleMouseLeave(){
        setShowDetail(false);
    }
    async function handleCancel(){
        try{
            await axios.put(`http://localhost:4000/order/setCancel?id=${orderId}`,{},
                {
                    headers: {
                      Authorization: localStorage.getItem("authToken")
                    }
                  }
            );
            getAllOrders();
        }catch(error){
            alert(error.message);
            console.log(error);
            if(error.response.data.message=="jwt expired"){
                localStorage.removeItem("authToken");
                navigate("/");
                return;
            }
        }
    }
    function handleHeader(){
        if(header){
            return {backgroundColor: "#555", color:"#fff"}
        }
    }
    return(
        <div className="values_container" onMouseLeave={handleMouseLeave} style={handleHeader()}> 
            {showDetail && (!header)?
            <div>
                <p className="product_values" style={{width:"270px",height:"33px"}}>{product_id.name}</p>
                <div style={{
                    position:"relative",
                    border: '1px solid #ccc',
                    boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                    width: '200px',
                    left:"170px",
                    borderRadius:"10px",
                    padding: '10px',
                    backdropFilter: "blur(5px)"}}
                    >
                        <strong>{product_id.name}</strong>
                        <p>SKU: {product_id.sku}</p>
                        <p>{product_id.description}</p>
                        <p>Price: ${product_id.price}</p>
                        <p>Current_stock: {product_id.current_stock}</p>
                </div>
            </div>
            :
            <p className="product_values" style={{padding:"0px 0px 0px 10px"}} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}  >{header?"Product":product_id.name}</p>}
            <p className="product_values">{quantity}</p>
            <p className="product_values">{order_date==="Date"?"Date":String(order_date).split("T")[0]}</p>
            {status==="Pending"?
            <div className="product_values" style={{padding:"10px 5px 10px 25px"}}> <button className="delete" onClick={handleCancel} >Cancel</button></div>
            :
            <div className="product_values" style={{color:handleColor(),fontSize:"20px",borderRadius:"20px",padding:"2px",margin:"10px"}}>{status}</div>
            }
        </div>
    )
}

export default OrderDetails;