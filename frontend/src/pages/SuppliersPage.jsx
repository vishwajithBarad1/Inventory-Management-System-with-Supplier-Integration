import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import AddSupplier from "../components/AddSupplier";
import SupplierDetails from "../components/SupplierDetails";

function SuppliersPage() {
    const navigate = useNavigate();
    const [suppliers, setSuppliers] = useState([]);

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
        fetchSuppliers();
    }, []);
    function getAllSuppliers(){
        fetchSuppliers();
    }
    function handleLogout() {
        localStorage.removeItem("authToken");
        navigate("/");
    }

    return (
        <div>
            <div className="dashboard-container">
                <div className="dashboard-buttons">
                    <button onClick={() => navigate('/dashboard')} className="dashboard-button">Dashboard</button>
                    <button onClick={() => navigate('/product')} className="dashboard-button">Products</button>
                    <button onClick={() => navigate('/orders')} className="dashboard-button">Orders</button>
                    <button onClick={() => navigate('/reports')} className="dashboard-button">Reports</button>
                </div>
                <h1 className="dashboard-title" style={{ margin: "50px auto -30px auto" }}>Suppliers Details</h1>
                <button className='logout' onClick={handleLogout}>Logout</button>
                <hr />
                <div className="addSupplierContainer">
                    <AddSupplier fetchSuppliers={getAllSuppliers} />
                </div>
                <div className="supplierContainer">
                <SupplierDetails 
                supplierId={""}
                name={"Name"}
                contact_info={"contact_info"}
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
