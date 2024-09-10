import React, { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/dashboard.css';
import axios from "axios";
import NavBar from '../components/NavBar';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
function DashBoard() {
    const navigate = useNavigate();
    const [products,setProducts] = useState([]);
    const [totalProducts,setTotalProducts] = useState(0);
    const [totalStock,setTotalStock] = useState(0);
    const [totalBelowReorder,setTotalBelowReorder] = useState(0);
    const [searchQuery,setSearchQuery] = useState("");
    const [isSearch, setIsSearch] = useState(false);
    const [page,setPage] = useState(1)
    const [totalPages,setTotalPages] = useState(0)
    const limit = 8;
    if(isSearch) {
        const filteredProducts = products.filter(product => (product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.sku.toLowerCase().includes(searchQuery.toLowerCase() ) || product.description.toLowerCase().includes(searchQuery.toLowerCase() )));
        setProducts(filteredProducts);
        setIsSearch(false)
    }
    async function inventoryValues(){
        const result =await axios.get("http://localhost:4000/report/dashboardReport",{
            headers:{
                'Authorization':localStorage.getItem("authToken")
            }
        })
        setTotalStock(result.data.data.totalStockValue);
        setTotalBelowReorder(result.data.data.produsctsBelowRLevel);
        setTotalProducts(result.data.data.totalProducts)
    }

    async function getProducts(){
        try{
            if(isSearch==false){
                const response = await axios.get(`http://localhost:4000/product/getAllProducts?page=${page}&limit=${limit}`,{
                    headers:{
                        'Authorization':localStorage.getItem("authToken")
                    }
                });
                setProducts(response.data.data.data);
                setTotalPages(response.data.data.totalPages);  
            }else{
                const response = await axios.get(`http://localhost:4000/search/searchProduct?searchQuery=${searchQuery}&page=${page}&limit=${limit}`,{
                    headers:{
                        'Authorization':localStorage.getItem("authToken")
                    }
                });
                setProducts(response.data.data.data);
            }
        }catch(error){
            if(error.response.data.message=="jwt expired"){
                localStorage.removeItem("authToken");
                alert("please re-login")
                navigate("/");
                return;
            }else{
                alert(error.message);
            }
        }
    } 

    async function getAllProducts(){
        try{
            const response = await axios.get(`http://localhost:4000/product/getAllProducts?order=1`,{
                headers:{
                    'Authorization':localStorage.getItem("authToken")
                }
            });
            setProducts(response.data.data.data);
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
    }, [page]);
    useEffect(()=>{
        inventoryValues();
    },[])
    return (
        <div>
            <NavBar page={"dashboard"} searchQuery={searchQuery} setIsSearch={setIsSearch} setSearchQuery={setSearchQuery} getProducts={getAllProducts}/>
            <div className="dashboard-container" style={{marginTop:"10px"}}>
                <div className='inventoryValues'>Total Products : <span style={{fontWeight:"bold"}}>{totalProducts}</span></div>
                <div className='inventoryValues'>Total Stock Value : <span style={{fontWeight:"bold"}}>{totalStock}</span></div>
                <div className='inventoryValues'>Products Below Reorder Level : <span style={{fontWeight:"bold"}}>{totalBelowReorder}</span></div>
            </div>
            <div className='products-card-container'>
            {products.map((product,index) =>{return <ProductCard key={index} name={product.name} sku={product.sku} description={product.description} price={product.price} current_stock={product.current_stock} stock={product.stock}/>})}
            </div>
            <Pagination setPage={setPage} totalPages={totalPages} page={page}/>
        </div>
    );
}

export default DashBoard;
