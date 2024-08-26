import { useState } from "react";
import "../styles/ProductDetails.css"
import axios from "axios"
import { useEffect } from "react";
function SupplierDetails({supplierId,name,contact_info, header,getAllSuppliers,supplierPage}){
    const [Name, setName] = useState(name);
    const [ContactInfo, setContactInfo] = useState(contact_info);
    const [supplierName, setSupplierName] = useState("");
    async function handleSubmit(){
        setName(null);
        try{
            await axios.put(`http://localhost:4000/supplier/updateSupplier?id=${supplierId}`,
                {
                    name:Name,
                    contact_info:ContactInfo
                },{
                    headers: {
                      Authorization: localStorage.getItem("authToken")
                    }
                  }
                )
                setSupplierName(null);
        }catch(error){
            console.error(error);
            alert("An error occurred while saving the changes. Please try again later.");
        }
    }
    async function handleDelete(){
        setName(null);
        try{
            await axios.delete(`http://localhost:4000/supplier/deleteSupplier?id=${supplierId}`,{
                headers: {
                  Authorization: localStorage.getItem("authToken")
                }
              }
            )
            getAllSuppliers()
        }catch(error){
            console.error(error);
            alert("An error occurred while deleting the supplier. Please try again later.");
        }
    }
    function handleCancel(){
        setSupplierName(null);
    }
    function handleEdit(){
        setSupplierName(name);
    }
    return(
        supplierName===name?
            <div className="values_container">
                <input className="product_values" type="text" value={name} onChange={(event)=>{setName(event.target.value);}}/>
                <input className="product_values" type="text" value={ContactInfo} onChange={(event)=>{setContactInfo(event.target.value);}}/>
                <div className="product_values" style={{backgroundColor: '#fec590'}} ><button className="edit" onClick={handleSubmit}>submit</button><button className="delete" onClick={handleCancel}>cancel</button></div>
                </div>
        :<div className="values_container">
            <div className="product_values">{name}</div>
            <div className="product_values">{ContactInfo}</div>
            {!supplierPage || header?header?<div className="product_values"></div>:<></>:<div className="product_values"><button className="edit" onClick={handleEdit}>edit</button><button className="delete" onClick={handleDelete} >delete</button></div>}
        </div>
    )
}

export default SupplierDetails;