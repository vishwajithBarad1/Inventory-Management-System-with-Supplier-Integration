import React, { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/dashboard.css';
import axios from "axios";
import NavBar from '../components/NavBar';
import ProductCard from '../components/ProductCard';
function DashBoard() {
    const navigate = useNavigate();
    const [products,setProducts] = useState([]);
    const [totalStock,setTotalStock] = useState(0);
    const [totalBelowReorder,setTotalBelowReorder] = useState(0);
    const [searchQuery,setSearchQuery] = useState("");
    const [isSearch, setIsSearch] = useState(false);
    
    if(isSearch) {
        const filteredProducts = products.filter(product => (product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.sku.toLowerCase().includes(searchQuery.toLowerCase() ) || product.description.toLowerCase().includes(searchQuery.toLowerCase() )));
        setProducts(filteredProducts);
        setIsSearch(false)
    }
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
            <NavBar page={"dashboard"} searchQuery={searchQuery} setIsSearch={setIsSearch} setSearchQuery={setSearchQuery} getProducts={getProducts}/>
            <div style={{margin:"60px auto 10px auto"}}>
                <span className='inventoryValues'>Total Products : <span style={{fontWeight:"bold"}}>{products.length}</span></span>
                <span className='inventoryValues'>Total Stock Value : <span style={{fontWeight:"bold"}}>{totalStock}</span></span>
                <span className='inventoryValues'>Products Below Reorder Level : <span style={{fontWeight:"bold"}}>{totalBelowReorder}</span></span>
            </div>
            </div>
            <div className='products-card-container'>
            {products.map((product,index) =>{return <ProductCard key={index} name={product.name} sku={product.sku} description={product.description} price={product.price} current_stock={product.current_stock} stock={product.stock}/>})}
            </div>

        </div>
    );
}

export default DashBoard;
