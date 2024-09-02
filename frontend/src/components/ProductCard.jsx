import React from 'react';
import productImage from '../assets/productPlaceholder.png'
import "../styles/ProductCard.css"
function ProductCard ({name,sku,description,price,current_stock,stock}){
    function handleStock(){
        if((current_stock/stock)*100 == 0){return <span style={{color:"#FFFFFF"}}>Stock : {current_stock}</span>;}
        if((current_stock/stock)*100 <=25){return <span style={{color:"#FFFFFF"}}>Stock : {current_stock}</span>;}
        if((current_stock/stock)*100 <=50){return <span style={{color:"#000000"}}>Stock : {current_stock}</span>;}
        if((current_stock/stock)*100 <=75){return <span style={{color:"#000000"}}>Stock : {current_stock}</span>;}
        return <span style={{color:"#FFFFFF"}}>Stock : {current_stock}</span>;
    }
    function getBackgroundColor(){
        if(current_stock==0){return "#FF4C4C";}
        if((current_stock/stock)*100 <=25){return "#FF8C00";}
        if((current_stock/stock)*100 <=50){return "#FFD700";}
        if((current_stock/stock)*100 <=75){return "#90EE90";}
        return "#28A745";
    }
    return (
        <div className='cardContainer'>
            <div className='imageContainer'>
                <img src={productImage} width="200px"></img>
            </div>
            <div className='titleContainer'>
                <h2>{name}</h2>
                <h3>{sku}</h3>
            </div>
            <div>
                <p className='product-description'>{description}</p>
                <h3>{price} $</h3>
                <div className='stock'style={{backgroundColor:getBackgroundColor()}}>{handleStock()}</div>
            </div>
        </div>
    );
};

export default ProductCard;