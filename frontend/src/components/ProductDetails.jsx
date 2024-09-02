import { useState } from "react";
import "../styles/ProductDetails.css"
import axios from "axios"
import ProductForm from "./ProductForm";
function ProductDetails({productId,name,sku,description,price,current_stock,stock,productSKU,productPage,setProductSKU, header,getAllProducts}){
    const [openModal,setOpenModal] = useState(false);
    async function handleDelete(){
        // Delete product here
        setProductSKU(null);
        try{
            await axios.delete(`http://localhost:4000/product/deleteProduct?id=${productId}`,{
                headers: {
                  Authorization: localStorage.getItem("authToken")
                }
              }
            )
            getAllProducts();
        }catch(error){
            console.error(error);
            alert("An error occurred while deleting the product. Please try again later.");
        }
    }
    function handleEdit(){
        setOpenModal(true);
    }
    function getBackgroundColor(stock_value){
        if(stock_value==="Current Stock"){return "#555";}
        if((stock_value/stock)*100 <=25){return "#f38989";}
        if((stock_value/stock)*100 <=50){return "#f2b4a3";}
        if((stock_value/stock)*100 <=75){return "#ffdbc2";}
        return "#78c1a3";
    }
    function getFontSize(current_stock){
        if(current_stock==="Current Stock"){return "16px";}
        return "20px";
    }
    function handleWidth(){
        if(current_stock!=="current_stock"){return "bold"}
        return "normal";
    }
    function handleHeaderStyle(){
        const style = {backgroundColor:"#555",color:"#fff"}
        if(current_stock==="Current Stock"){
            return style;
        }
        return {};
    }
    return(
        <>
        {openModal && <ProductForm setOpenModal={setOpenModal} name={name} sku={sku} description={description} price={price} getAllProducts={getAllProducts} productId={productId} current_stock={current_stock}/>}
        <div className="values_container-dashboard" style={handleHeaderStyle()}>
            <p className="product_values">{name}</p>
            <p className="product_values">{sku}</p>
            <p className="product_values">{price} $</p>
            <p className="product_values" style={{textDecoration: `underline 3px ${getBackgroundColor(current_stock)}`, fontSize:getFontSize(current_stock),fontWeight:handleWidth() }}>{current_stock}</p>
            {!productPage || header?header?<div className="product_values"></div>:<></>:<div className="product_values" style={{padding:"10px 0px"}}><button className="edit" onClick={handleEdit}>edit</button><button className="delete" onClick={handleDelete} >delete</button></div>}
        </div>
        </>
    )
}

export default ProductDetails;