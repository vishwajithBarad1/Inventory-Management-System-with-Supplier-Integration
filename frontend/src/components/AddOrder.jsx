//product_id, quantity, order_date
import { useState, useEffect } from "react";
import "../styles/AddProduct.css"
import axios from "axios";
function AddOrder({getAllOrders}){
    const [product_id,setProduct_id] = useState("");
    const [quantity,setQuantity] = useState('');
    const [order_date,setOrder_date] = useState('');
    const [products,setProducts] = useState([]);

    function getCurrentDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

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
                    setProduct_id('');
                    setQuantity('');
                    setOrder_date(getCurrentDate());
            }else{
                alert("Please fill in all fields")
            }
        }catch(error){
            if (error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message);
              } else {
                  alert('An unexpected error occurred.');
              }
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

    function handleProductChange(event) {
        setProduct_id(event.target.value);
    }

    function handleQuantityChange(event) {
        setQuantity(event.target.value);
    }

    function handleDateChange(event) {
        setOrder_date(event.target.value);
    }

    useEffect(() => {
        getAllProducts();
    }, []);

    return (
        <>
            <div className="inputBar">
                <select className="selectProduct" value={product_id} onChange={handleProductChange}>
                    <option value="">Product Name</option>
                    {products.map((product) => (
                        <option key={product._id} value={product._id}>
                            {product.name}
                        </option>
                    ))}
                </select>
                <input
                    type="number"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={handleQuantityChange}
                />
                <input
                    type="date"
                    placeholder="Date"
                    value={order_date}
                    onChange={handleDateChange}
                />
            </div>
            <div className="submitButton" style={{ marginBottom: "30px" }} onClick={createNewOrder}>
                Place Order
            </div>
        </>
    );
}

export default AddOrder;