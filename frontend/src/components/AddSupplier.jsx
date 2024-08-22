import { useState,useEffect } from "react";
import "../styles/AddProduct.css"
import axios from "axios";
function AddSupplier({fetchSuppliers}){
    const [name,setName] = useState("");
    const [contact_info,setContact_info] = useState("");

    async function createNewSupplier(){
        try{
            if(name && contact_info){
                const response = await axios.post(
                    "http://localhost:4000/supplier/createSupplier",
                    {
                      name: name,
                      contact_info: contact_info,
                    },
                    {
                      headers: {
                        Authorization: localStorage.getItem("authToken")
                      }
                    }
                  );
                  fetchSuppliers();
                  setName("");
                  setContact_info("");
            }else{
                alert("Please fill in all fields")
            }
        }catch(e){
            console.error("Error creating product",e);
            alert("Error creating supplier")
        }
    }
    
    return(
        <>
            <div className="inputBar">
                <input type="text" placeholder="Name" value={name} onChange={(event)=>{setName(event.target.value);}}/>
                <input type="text" placeholder="contact_info" value={contact_info} onChange={(event)=>{setContact_info(event.target.value);}}/>
            </div>
            <div className="submitButton" onClick={createNewSupplier}>
                Add supplier
            </div>
        </>
    )
}

export default AddSupplier;