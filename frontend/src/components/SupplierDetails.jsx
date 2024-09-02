import { useState } from "react";
import "../styles/ProductDetails.css"
import axios from "axios"
import { useEffect } from "react";
function SupplierDetails({supplierId,name,contact_info, header,getAllSuppliers,supplierPage}){
    const [Name, setName] = useState(name);
    const [ContactInfo, setContactInfo] = useState(contact_info);
    const [supplierName, setSupplierName] = useState("");
    async function handleSubmit(){
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
                getAllSuppliers()
        }catch(error){
            if (error.response && error.response.data && error.response.data.message) {
                if(error.response.data.message.includes('"contact_info" with value')){
                    alert("please provide a valid contact_info \nex: +91 9876543210");
                    return;
                  }
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
    async function handleDelete(){
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
    function handleHeaderStyle(){
        if(header)return{backgroundColor:"#555",color:"#fff"}
    }
    return(
        supplierName===name?
            <div className="values_container">
                <input className="product_values" type="text" value={Name} onChange={(event)=>{setName(event.target.value);}}/>
                <input className="product_values" type="text" value={ContactInfo} onChange={(event)=>{setContactInfo(event.target.value);}}/>
                <div className="product_values" style={{backgroundColor: '#fec590',padding:"10px 0px"}} ><button className="edit" onClick={handleSubmit}>submit</button><button className="delete" onClick={handleCancel}>cancel</button></div>
                </div>
        :<div className="values_container" style={handleHeaderStyle()}>
            <p className="product_values">{name}</p>
            <p className="product_values">{ContactInfo}</p>
            {!supplierPage || header?header?<div className="product_values" ></div>:<></>:<div className="product_values" style={{padding:"10px 0px"}}><button className="edit" onClick={handleEdit}>edit</button><button className="delete" onClick={handleDelete} >delete</button></div>}
        </div>
    )
}

export default SupplierDetails;