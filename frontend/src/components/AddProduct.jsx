import { useState,useEffect } from "react";
import "../styles/AddProduct.css"
import axios from "axios";
function AddProduct({getAllProducts}){
    const [name,setName] = useState("");
    const [SKU,setSKU] = useState("");
    const [description,setDescription] = useState("");
    const [price,setPrice] = useState("");
    const [currentStock, setCurrentStock] = useState("");
    const [reorderLevel, setReorderLevel] = useState("");
    const [supplierId, setSupplierId] = useState("");
    const [suppliers, setSuppliers] = useState([]);

    function handleChange(event){
        setSupplierId(event.target.value);
    }
    async function getSuppliers(){
        try{
            const response = await axios.get("http://localhost:4000/supplier/getAllSuppliers",{
                headers: {
                    Authorization: localStorage.getItem("authToken")
                }
            });
            setSuppliers(response.data.data);
        }catch(e){
            console.error("Error getting suppliers",e);
            alert("Error getting suppliers")
        }
    }
    async function createNewProduct(){
        try{
            const response = await axios.post(
                "http://localhost:4000/product/createProduct",
                {
                  name: name,
                  sku: SKU,
                  description: description,
                  price: price,
                  current_stock: currentStock,
                  reorder_level: reorderLevel,
                  supplier_id: supplierId
                },
                {
                  headers: {
                    Authorization: localStorage.getItem("authToken")
                  }
                }
              );
            getAllProducts();
            setName("");
            setSKU("");
            setDescription("");
            setPrice("");
            setCurrentStock("");
            setReorderLevel("");
            setSupplierId("");
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
        }
    }
    useEffect(()=>{
        if(localStorage.getItem("authToken")){
            getSuppliers();
        }
    },[]);
    return(
        <div>
            <div className="inputBar">
                <input type="text" placeholder="Name" value={name} onChange={(event)=>{setName(event.target.value);}}/>
                <input type="text" placeholder="SKU" value={SKU} onChange={(event)=>{setSKU(event.target.value);}}/>
                <input type="text" placeholder="Description" value={description} onChange={(event)=>{setDescription(event.target.value);}}/>
                <input type="number" placeholder="CurrentStock" value={currentStock} onChange={(event)=>{setCurrentStock(event.target.value);}}/>
                <input type="number" placeholder="Price" value={price} onChange={(event)=>{setPrice(event.target.value);}}/>
                <input type="number" placeholder="ReorderLevel" value={reorderLevel} onChange={(event)=>{setReorderLevel(event.target.value);}}/>
                <select className="supplier" onChange={handleChange}><option value="supplierName">supplier Name</option>{suppliers.map((supplier)=>{return <option value={supplier._id}>{supplier.name}</option>})}</select>
            </div>
            <div className="submitButton" onClick={createNewProduct}>
                Add product
            </div>
        </div>
    )
}

export default AddProduct;