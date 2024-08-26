import React, { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/dashboard.css'; // Importing a CSS file for styling
import ProductDetails from "../components/ProductDetails"
import axios from "axios";
function DashBoard() {
    const navigate = useNavigate();
    const [products,setProducts] = useState([]);
    const [totalStock,setTotalStock] = useState(0);
    const [totalBelowReorder,setTotalBelowReorder] = useState(0);
    function totalStockValue(){
        const value = products.reduce((sum,product) => Number(sum) + Number(product.current_stock),0);
        let totalBelowReorder =  0
        products.forEach(product=>{
            if(product.current_stock<product.reorder_level){
                totalBelowReorder++;
            }
        })
        setTotalStock(value);
        setTotalBelowReorder(totalBelowReorder)
    }
    function handleLogout(){
        localStorage.removeItem("authToken");
        navigate("/");
    }
    async function getProducts(){
        try{
            const response = await axios.get("http://localhost:4000/product/getAllProducts",{
                headers:{
                    'Authorization':localStorage.getItem("authToken")
                }
            });
            setProducts(response.data.data);
        }catch(error){
            alert(error.message);
        }
    } 
    useEffect(() => {
        if(!localStorage.getItem("authToken")){
            navigate("/");
            return;
        }
        getProducts();
    }, []);
    useEffect(()=>{
        totalStockValue();
    },[products])
    return (
        <div>
            <div className="dashboard-container">
            <div className="dashboard-buttons">
                <button onClick={() => navigate('/dashboard')} className="dashboard-button">Dashboard</button>
                <button onClick={() => navigate('/product')} className="dashboard-button">Products</button>
                <button onClick={() => navigate('/suppliers')} className="dashboard-button">Suppliers</button>
                <button onClick={() => navigate('/orders')} className="dashboard-button">Orders</button>
                <button onClick={() => navigate('/reports')} className="dashboard-button">Reports</button>
            </div>
            <h1 className="dashboard-title">Inventory Management System</h1>
            <div>
                <button className='logout' onClick={handleLogout}>logout</button>
            </div>
            <div>
                <span className='inventoryValues'>Total products : {products.length}</span>
                <span className='inventoryValues'>Total stock value : {totalStock}</span>
                <span className='inventoryValues'>Products Below Reorder Level : {totalBelowReorder}</span>
            </div>
            </div>
            <ProductDetails name={"name"} sku={"sku"} description={"description"} price={"price"} current_stock={"current_stock"} ></ProductDetails>
            {products.map((product) =>{return <ProductDetails name={product.name} sku={product.sku} description={product.description} price={product.price} current_stock={product.current_stock} stock={product.stock}/>})}
            
        </div>
    );
}

export default DashBoard;
