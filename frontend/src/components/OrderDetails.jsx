import { useState } from "react";
import "../styles/ProductDetails.css"
import axios from "axios"
function OrderDetails({orderId, product_id, quantity, order_date, status, getAllOrders, header, orderPage}){
    const [showDetail, setShowDetail] = useState(false);

    function handleBackgroundColor(){
        if (status === "Cancelled"){
            return "rgba(255,0,0,0.5)"
        }else{
            return "rgba(0,255,0,0.5)"
        }
    }
    function handleMouseEnter(){
        setShowDetail(true);
        console.log("MouseEntered")

    }
    function handleMouseLeave(){
        setShowDetail(false);
        console.log("MouseLeft")
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
        }
    }
    return(
        <div className="values_container" onMouseLeave={handleMouseLeave}> 
            {showDetail?
            <div>
                <div className="product_values" style={{width:"211px"}}>{product_id.name}</div>
                <div style={{
                    position:"relative",
                    border: '1px solid #ccc',
                    boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                    width: '200px',
                    left:"170px",
                    marginBottom: '-300px',
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
            <div className="product_values" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>{product_id.name}</div>}
            <div className="product_values">{quantity}</div>
            <div className="product_values">{order_date==="Date"?"Date":String(order_date).split("T")[0]}</div>
            <div className="product_values" >{status}</div>
            {status==="Pending"?
            <div className="product_values" ><button className="delete" onClick={handleCancel}>Cancel Order</button></div>
            :
            <div className="product_values" style={{backgroundColor:handleBackgroundColor()}}></div>
            }
        </div>
    )
}

export default OrderDetails;