import { useState } from "react";
import "../styles/ProductDetails.css"
import axios from "axios"
import { useEffect } from "react";
function ProductDetails({productId,name,sku,description,price,current_stock,stock,productSKU,productPage,setProductSKU, header,getAllProducts}){
    const [Name, setName] = useState(name);
    const [Sku, setSku] = useState(sku);
    const [Description, setDescription] = useState(description);
    const [Price, setPrice] = useState(price);
    const [CurrentStock, setCurrentStock] = useState(current_stock);

    async function handleSubmit(){
        setProductSKU(null);
        try{
            await axios.put(`http://localhost:4000/product/updateProduct?id=${productId}`,
                {
                    name:Name,
                    sku:Sku,
                    description:Description,
                    price:Price,
                    current_stock:CurrentStock
                },{
                    headers: {
                      Authorization: localStorage.getItem("authToken")
                    }
                  }
                )
                getAllProducts();
        }catch(error){
            console.error(error);
            alert("An error occurred while saving the changes. Please try again later.");
        }
    }
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
        setProductSKU(sku);
    }
    function getBackgroundColor(stock_value){
        if(stock_value==="current_stock"){return "pink";}
        if((stock_value/stock)*100 <=25){return "red";}
        if((stock_value/stock)*100 <=50){return "orange";}
        if((stock_value/stock)*100 <=75){return "yellow";}
        return "MediumSeaGreen";
    }
    return(
        productSKU===sku?
            <div className="values_container">
                <input className="product_values" type="text" value={Name} onChange={(event)=>{setName(event.target.value);}}/>
                <input className="product_values" type="text" value={Sku} onChange={(event)=>{setSku(event.target.value);}}/>
                <input className="product_values" type="text" value={Description} onChange={(event)=>{setDescription(event.target.value);}}/>
                <input className="product_values" type="number" value={Price} onChange={(event)=>{setPrice(event.target.value);}}/>
                <input className="product_values" type="number" value={CurrentStock} onChange={(event)=>{setCurrentStock(event.target.value);}}/>
                <button className="product_values" style={{backgroundColor: 'Violet'}} ><button className="edit" onClick={handleSubmit}>submit</button><button className="delete" onClick={()=>{getAllProducts()}}>cancel</button></button>
                </div>
        :<div className="values_container">
            <div className="product_values">{name}</div>
            <div className="product_values">{sku}</div>
            <div className="product_values">{description}</div>
            <div className="product_values">{price}</div>
            <div className="product_values_stock" style={{ backgroundColor: getBackgroundColor(current_stock) }}>{current_stock}</div>
            {!productPage || header?header?<div className="product_values"></div>:<></>:<div className="product_values"><button className="edit" onClick={handleEdit}>edit</button><button className="delete" onClick={handleDelete} >delete</button></div>}
        </div>
    )
}

export default ProductDetails;