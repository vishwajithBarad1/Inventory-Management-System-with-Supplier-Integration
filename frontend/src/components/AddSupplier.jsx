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
        }catch(error){
            if (error.response && error.response.data && error.response.data.message) {
                if(error.response.data.message.includes('"contact_info" with value')){
                    alert("please provide a valid contact_info \nex: +91 9876543210");
                    return;
                  }
                  if(error.response.data.message.includes('duplicate key error')){
                    alert("supplier with this name already exists");
                    return;
                  }
                  if(error.response.data.message.includes('"name" with value')){
                    alert("please provide a valid supplier name\nit should not include numbers or spl charectors");
                    return;
                  }
                alert(error.response.data.message);
              } else {
                  alert('An unexpected error occurred.');
              }
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