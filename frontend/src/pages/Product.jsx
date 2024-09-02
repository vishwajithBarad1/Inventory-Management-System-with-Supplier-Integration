import React, { useState } from "react";
import axios from "axios"
import ProductDetails from "../components/ProductDetails"
import { useNavigate } from 'react-router-dom';
import AddProduct from "../components/AddProduct"
import NavBar from "../components/NavBar";
function Product(){
    const navigate = useNavigate();
    const [products,setProducts] = useState([]);
    const [productSKU,setProductSKU] = useState("");
    const [searchQuery,setSearchQuery] = useState("");
    const [isSearch, setIsSearch] = useState(false);

    if(isSearch) {
        const filteredProducts = products.filter(product => (product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ));
        setProducts(filteredProducts);
        setIsSearch(false)
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
                <NavBar page={"product"} searchQuery={searchQuery} setIsSearch={setIsSearch} setSearchQuery={setSearchQuery} getProducts={getAllProducts}/>
                <AddProduct getAllProducts={getAllProducts}/>
            </div>
            <div className="products-container">
            <ProductDetails name={"Name"} sku={"SKU"} description={"Description"} price={"Price"} current_stock={"Current Stock"} productPage={true} header={true}></ProductDetails>
            {products.map((product,index) =>{return <ProductDetails key={index} productId = {product._id} name={product.name} sku={product.sku} description={product.description} price={product.price} current_stock={product.current_stock} stock={product.stock} productSKU={productSKU} setProductSKU = {setProductSKU} productPage={true} getAllProducts={getAllProducts}/>})}
            </div>
        </div>
    )
}

export default Product;