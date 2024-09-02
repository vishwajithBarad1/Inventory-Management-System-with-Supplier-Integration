import React from "react";
import "../styles/ProductForm.css";
import { useState } from "react";
import axios from "axios";
function ProductForm({setOpenModal, name, description, sku, price, current_stock,getAllProducts,productId}) {
    const [Name, setName] = useState(name);
    const [Sku, setSku] = useState(sku);
    const [Description, setDescription] = useState(description);
    const [Price, setPrice] = useState(price);
    const [CurrentStock, setCurrentStock] = useState(current_stock);
    console.log({setOpenModal, name, description, sku, price, current_stock,getAllProducts,productId})
    async function handleSubmit(){
        setOpenModal(false);
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
            if (error.response && error.response.data && error.response.data.message) {
                if(error.response.data.message.includes('"name" with value')){
                    alert("please provide a valid name with no numbers or spl characters");
                    return;
                  }
                alert(error.response.data.message);
              } else {
                  alert('An unexpected error occurred.');
              }
            console.error(error);
        }
    }
  return (
    <div className="modalBackground" >
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {setOpenModal(false);}}>
            X
          </button>
        </div>
        <div className="title">
          <h1>Edit Product Details</h1>
        </div>

        <div className="body">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={Name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>SKU</label>
            <input
              type="text"
              value={Sku}
              onChange={(e) => setSku(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              value={Description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Current Stock</label>
            <input
              type="number"
              value={CurrentStock}
              onChange={(e) => setCurrentStock(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              value={Price}
              onChange={(e) => setPrice(e.target.value)}
            /></div>
        </div>
        <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default ProductForm;