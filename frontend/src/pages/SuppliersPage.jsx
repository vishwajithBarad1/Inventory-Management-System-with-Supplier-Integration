import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import AddSupplier from "../components/AddSupplier";
import SupplierDetails from "../components/SupplierDetails";
import NavBar from "../components/NavBar";
import Pagination from "../components/Pagination";
function SuppliersPage() {
    const navigate = useNavigate();
    const [suppliers, setSuppliers] = useState([]);
    const [searchQuery,setSearchQuery] = useState("");
    const [isSearch, setIsSearch] = useState(false);
    const [page,setPage] = useState(1)
    const [totalPages,setTotalPages] = useState(0)
    const limit = 10;

    if(isSearch) {
        const filteredSuppliers = suppliers.filter(supplier => (supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ));
        setSuppliers(filteredSuppliers);
        setIsSearch(false)
    }
    const fetchSuppliers = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/supplier/getAllSuppliers?page=${page}&limit=${limit}`, {
                headers: {
                    Authorization: localStorage.getItem("authToken"),
                },
            });
            setSuppliers(response.data.data.data);
            setTotalPages(response.data.data.totalPages);
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
    }, [page]);
    function getAllSuppliers(){
        fetchSuppliers();
    }

    return (
        <div>
            <NavBar page={"supplier"} searchQuery={searchQuery} setIsSearch={setIsSearch} setSearchQuery={setSearchQuery} getProducts={getAllSuppliers}/>
                <div className="addSupplierContainer">
                    <AddSupplier fetchSuppliers={getAllSuppliers} />
                </div>
            <div className="dashboard-container">
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
                <Pagination page={page} setPage={setPage} totalPages={totalPages} style={{margin:"10px 10px",border:"2px solid #5555553b"}}/>
                </div>
            </div>
        </div>
    );
}

export default SuppliersPage;
