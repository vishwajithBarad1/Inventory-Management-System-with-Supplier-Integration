import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import AddSupplier from "../components/AddSupplier";
import SupplierDetails from "../components/SupplierDetails";
import NavBar from "../components/NavBar";
function SuppliersPage() {
    const navigate = useNavigate();
    const [suppliers, setSuppliers] = useState([]);
    const [searchQuery,setSearchQuery] = useState("");
    const [isSearch, setIsSearch] = useState(false);

    if(isSearch) {
        const filteredSuppliers = suppliers.filter(supplier => (supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ));
        setSuppliers(filteredSuppliers);
        setIsSearch(false)
    }
    const fetchSuppliers = async () => {
        try {
            const response = await axios.get("http://localhost:4000/supplier/getAllSuppliers", {
                headers: {
                    Authorization: localStorage.getItem("authToken"),
                },
            });
            setSuppliers(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if(!localStorage.getItem("authToken")){
            navigate("/");
            return;
        }
        fetchSuppliers();
    }, []);
    function getAllSuppliers(){
        fetchSuppliers();
    }

    return (
        <div>
            <div className="dashboard-container">
                <NavBar page={"supplier"} searchQuery={searchQuery} setIsSearch={setIsSearch} setSearchQuery={setSearchQuery} getProducts={getAllSuppliers}/>
                <div className="addSupplierContainer">
                    <AddSupplier fetchSuppliers={getAllSuppliers} />
                </div>
                <div className="supplierContainer">
                <SupplierDetails 
                supplierId={""}
                name={"Name"}
                contact_info={"Contact"}
                header={true}
                />
                {suppliers.map((supplier) => (
                    <SupplierDetails
                    key={supplier._id}
                    supplierId={supplier._id}
                    name={supplier.name}
                    contact_info={supplier.contact_info}
                    getAllSuppliers={getAllSuppliers} 
                    supplierPage={true}
                    />
                ))}
                </div>
            </div>
        </div>
    );
}

export default SuppliersPage;
