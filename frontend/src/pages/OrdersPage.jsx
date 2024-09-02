import { useState,useEffect } from "react";
import AddOrder from "../components/AddOrder";
import OrderDetails from "../components/OrderDetails";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

function OrdersPage(){
    const navigate = useNavigate();
    const [orders,setOrders] = useState([])
    const [searchQuery,setSearchQuery] = useState("");
    const [isSearch, setIsSearch] = useState(false);

    if(isSearch) {
        const filteredOrders = orders.filter(order => (order.product_id.name.toLowerCase().includes(searchQuery.toLowerCase()) || order.product_id.sku.toLowerCase().includes(searchQuery.toLowerCase()) ));
        setOrders(filteredOrders);
        setIsSearch(false)
    }
    async function getAllOrders(){
        // Fetch orders from server
        const response = await axios("http://localhost:4000/order/getAllOrder",{
            headers:{
                'Authorization':localStorage.getItem("authToken")
            }
        });
        setOrders(response.data.data);
    }

    useEffect(()=>{
        if(!localStorage.getItem("authToken")){
            navigate("/");
            return;
        }
        getAllOrders();
    },[]);

    return(
        <div>
            <div className="dashboard-container" style={{marginBottom:"150px"}}>
                <NavBar page={"order"} searchQuery={searchQuery} setIsSearch={setIsSearch} setSearchQuery={setSearchQuery} getProducts={getAllOrders}/>
                <div className="addOrderContainer">
                <AddOrder getAllOrders={getAllOrders} />
                </div>
                <div>
                    <OrderDetails orderId={""} quantity={"Quantity"} order_date={"Order Date"} status={"Status"} orderPage={true} getAllOrders={getAllOrders} header={true}/>
                    {orders.map((order,index) => (
                        <OrderDetails key={index} orderId={order._id} product_id={order.product_id} quantity={order.quantity} order_date={order.order_date} status={order.status} orderPage={true} getAllOrders={getAllOrders} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default OrdersPage;