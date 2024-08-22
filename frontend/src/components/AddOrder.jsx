//product_id, quantity, order_date
import { useState } from "react";
import "../styles/AddProduct.css"
import axios from "axios";
function AddOrder({getAllOrders}){
    const [product_id,setProduct_id] = useState(null);
    const [quantity,setQuantity] = useState(null);
    const [order_date,setOrder_date] = useState(Date.now());

    async function createNewOrder(){
        try{
            if( product_id && quantity && order_date){
                const response = await axios.post(
                    "http://localhost:4000/order/createOrder",
                    {
                        product_id, quantity, order_date
                    },
                    {
                      headers: {
                        Authorization: localStorage.getItem("authToken")
                      }
                    }
                  );
                  getAllOrders();
                  setProduct_id(null);
                  setQuantity(null);
                  setOrder_date(Date.now());
            }else{
                alert("Please fill in all fields")
            }
        }catch(e){
            console.error("Error creating Order",e);
            alert("Error creating Order")
        }
    }
    
    return(
        <>
            <div className="inputBar">
                <input type="text" placeholder="Product Id" value={product_id} onChange={(event)=>{setProduct_id(event.target.value);}}/>
                <input type="number" placeholder="Quantity" value={quantity} onChange={(event)=>{setQuantity(event.target.value);}}/>
                <input type="date" placeholder="Date" value={order_date} onChange={(event)=>{setOrder_date(event.target.value);}}/>
            </div>
            <div className="submitButton" onClick={createNewOrder}>
                Add Order
            </div>
        </>
    )
}

export default AddOrder;