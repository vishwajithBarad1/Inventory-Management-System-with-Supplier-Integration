//product_id, quantity, order_date
import { useState, useEffect } from "react";
import "../styles/AddProduct.css"
import axios from "axios";
function AddOrder({getAllOrders}){
    const [product_id,setProduct_id] = useState(null);
    const [quantity,setQuantity] = useState(null);
    const [order_date,setOrder_date] = useState(Date.now());
    const [products,setProducts] = useState([]);

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
    
    async function getAllProducts(){
        try{
            const response = await axios.get("http://localhost:4000/product/getAllProducts",{
                headers:{
                    'Authorization':localStorage.getItem("authToken")
                }
            });
            setProducts(response.data.data);
        }catch(e){
            console.error("Error fetching products",e);
            alert("Error fetching products")
        }
    }
    function handleChange(event){
        setProduct_id(event.target.value);
        console.log({product_id});
    }
    useEffect(()=>{
        getAllProducts();
    },[]);
    
    return(
        <>
            <div className="inputBar">
                <select className="selectProduct" onChange={handleChange}><option value="ProductName">Product Name</option>{products.map((product)=>{return <option value={product._id} > {product.name}</option>})}</select>
                <input type="number" placeholder="Quantity" value={quantity} onChange={(event)=>{setQuantity(event.target.value);}}/>
                <input type="date" placeholder="Date" value={order_date} onChange={(event)=>{setOrder_date(event.target.value);}}/>
            </div>
            <div className="submitButton" style={{marginBottom:"30px"}} onClick={createNewOrder}>
                Add Order
            </div>
        </>
    )
}

export default AddOrder;