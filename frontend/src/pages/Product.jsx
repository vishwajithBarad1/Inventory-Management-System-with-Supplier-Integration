import React, { useState } from "react";
import axios from "axios"
import ProductDetails from "../components/ProductDetails"
import { useNavigate } from 'react-router-dom';
import AddProduct from "../components/AddProduct"
function Product(){
    const navigate = useNavigate();
    const [products,setProducts] = useState([]);
    const [productSKU,setProductSKU] = useState("");
    
    function handleLogout(){
        localStorage.removeItem("authToken");
        navigate("/");
    }

    async function getAllProducts(){
        try{
            const response = await axios.get("http://localhost:4000/product/getAllProducts",{
                headers:{
                    'Authorization':localStorage.getItem("authToken")
                }
            });
            setProducts(response.data.data);
        }catch(error){
            console.error(error.response.data.message)
        }
    }
    React.useEffect(()=>{
        if(!localStorage.getItem("authToken")){
            navigate("/");
            return;
        }
        getAllProducts();
    },[]);
    return(
        <div>
            <div className="dashboard-container">
                <div className="dashboard-buttons">
                    <button onClick={() => navigate('/dashboard')} className="dashboard-button">Dashboard</button>
                    <button onClick={() => navigate('/suppliers')} className="dashboard-button">Suppliers</button>
                    <button onClick={() => navigate('/orders')} className="dashboard-button">Orders</button>
                    <button onClick={() => navigate('/reports')} className="dashboard-button">Reports</button>
                </div>
                <h1 style={{margin:"50px auto -30px auto"}}>Product details</h1>
                <AddProduct/>
            </div>
            <div>
                <button className='logout' onClick={handleLogout}>logout</button>
            </div>
            <ProductDetails name={"name"} sku={"sku"} description={"description"} price={"price"} current_stock={"current_stock"} productPage={true} header={true}></ProductDetails>
            {products.map((product) =>{return <ProductDetails productId = {product._id} name={product.name} sku={product.sku} description={product.description} price={product.price} current_stock={product.current_stock} stock={product.stock} productSKU={productSKU} setProductSKU = {setProductSKU} productPage={true} getAllProducts={getAllProducts} />})}
            
        </div>
    )
}

export default Product;