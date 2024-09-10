import React, { useState } from "react";
import axios from "axios"
import ProductDetails from "../components/ProductDetails"
import { useNavigate } from 'react-router-dom';
import AddProduct from "../components/AddProduct"
import NavBar from "../components/NavBar";
import Pagination from "../components/Pagination";
function Product(){
    const navigate = useNavigate();
    const [products,setProducts] = useState([]);
    const [productSKU,setProductSKU] = useState("");
    const [searchQuery,setSearchQuery] = useState("");
    const [isSearch, setIsSearch] = useState(false);
    const [page,setPage] = useState(1)
    const [totalPages,setTotalPages] = useState(0)
    const limit = 10;

    if(isSearch) {
        const filteredProducts = products.filter(product => (product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ));
        setProducts(filteredProducts);
        setIsSearch(false)
    }
    async function getAllProducts(){
        try{
            const response = await axios.get(`http://localhost:4000/product/getAllProducts?page=${page}&limit=${limit}`,{
                headers:{
                    'Authorization':localStorage.getItem("authToken")
                }
            });
            setProducts(response.data.data.data);
            setTotalPages(response.data.data.totalPages);

        }catch(error){
            console.error(error.response.data.message)
            if(error.response.data.message=="jwt expired"){
                localStorage.removeItem("authToken");
                navigate("/");
                return;
            }
        }
    }
    React.useEffect(()=>{
        if(!localStorage.getItem("authToken")){
            navigate("/");
            return;
        }
        getAllProducts();
    },[page]);
    return(
        <div>
            <NavBar page={"product"} searchQuery={searchQuery} setIsSearch={setIsSearch} setSearchQuery={setSearchQuery} getProducts={getAllProducts}/>
            <div className="dashboard-container" style={{marginTop:"10px"}}>
                <AddProduct getAllProducts={getAllProducts}/>
            </div>
            <div className="products-container">
            <ProductDetails name={"Name"} sku={"SKU"} description={"Description"} price={"Price"} current_stock={"Current Stock"} productPage={true} header={true}></ProductDetails>
            {products.map((product,index) =>{return <ProductDetails key={index} productId = {product._id} name={product.name} sku={product.sku} description={product.description} price={product.price} current_stock={product.current_stock} stock={product.stock} productSKU={productSKU} setProductSKU = {setProductSKU} productPage={true} getAllProducts={getAllProducts}/>})}
            </div>
            <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        </div>
    )
}

export default Product;