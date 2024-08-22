import { useState,useEffect } from "react";
import AddOrder from "../components/AddOrder";
import OrderDetails from "../components/OrderDetails";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function OrdersPage(){
    const navigate = useNavigate();
    const [orders,setOrders] = useState([])
    async function getAllOrders(){
        // Fetch orders from server
        const response = await axios("http://localhost:4000/order/getAllOrder",{
            headers:{
                'Authorization':localStorage.getItem("authToken")
            }
        });
        setOrders(response.data.data);
    }
    function handleLogout() {
        localStorage.removeItem("authToken");
        navigate("/");
    }
    useEffect(()=>{
        getAllOrders();
        console.log(orders)
    },[]);

    return(
        <div>
            <div className="dashboard-container" style={{marginBottom:"150px"}}>
            <div className="dashboard-buttons">
                    <button onClick={() => navigate('/dashboard')} className="dashboard-button">Dashboard</button>
                    <button onClick={() => navigate('/product')} className="dashboard-button">Products</button>
                    <button onClick={() => navigate('/suppliers')} className="dashboard-button">Suppliers</button>
                    <button onClick={() => navigate('/reports')} className="dashboard-button">Reports</button>
                </div>
                <h1 className="dashboard-title" style={{ margin: "50px auto -30px auto" }}>Order Details</h1>
                <button className='logout' onClick={handleLogout}>Logout</button>
                <hr />
                <div className="addOrderContainer">
                <AddOrder getAllOrders={getAllOrders} />
                </div>
                <div>
                    {orders.map((order) => (
                        <OrderDetails orderId={order._id} product_id={order.product_id} quantity={order.quantity} order_date={order.order_date} status={order.status} orderPage={true} getAllOrders={getAllOrders} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default OrdersPage;