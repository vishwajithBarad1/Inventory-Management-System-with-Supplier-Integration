import { useState,useEffect } from "react";
import AddOrder from "../components/AddOrder";
import OrderDetails from "../components/OrderDetails";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Pagination from "../components/Pagination";

function OrdersPage(){
    const navigate = useNavigate();
    const [orders,setOrders] = useState([])
    const [searchQuery,setSearchQuery] = useState("");
    const [isSearch, setIsSearch] = useState(false);
    const [page,setPage] = useState(1)
    const [totalPages,setTotalPages] = useState(0)
    const limit = 10;

    if(isSearch) {
        const filteredOrders = orders.filter(order => (order.product_id.name.toLowerCase().includes(searchQuery.toLowerCase()) || order.product_id.sku.toLowerCase().includes(searchQuery.toLowerCase()) ));
        setOrders(filteredOrders);
        setIsSearch(false)
    }
    async function getAllOrders(){
        // Fetch orders from server
        try{
            const response = await axios.get(`http://localhost:4000/order/getAllOrder?page=${page}&limit=${limit}`,{
                headers:{
                    'Authorization':localStorage.getItem("authToken")
                }
            });
            setOrders(response.data.data.data);
            setTotalPages(response.data.data.totalPages);
            console.log(response);
        }catch(error){
            console.log(error);
            if(error.response.data.message==="jwt expired"){
                localStorage.removeItem("authToken");
                navigate("/");
                return;
            }
        }
    }

    useEffect(()=>{
        if(!localStorage.getItem("authToken")){
            navigate("/");
            return;
        }
        getAllOrders();
    },[page]);

    return(
        <div>
            <NavBar page={"order"} searchQuery={searchQuery} setIsSearch={setIsSearch} setSearchQuery={setSearchQuery} getProducts={getAllOrders}/>
            <div className="addOrderContainer">
                <AddOrder getAllOrders={getAllOrders} />
            </div>
            <div className="dashboard-container-orders" style={{marginBottom:"150px"}}>
                <OrderDetails orderId={""} quantity={"Quantity"} order_date={"Order Date"} status={"Status"} orderPage={true} getAllOrders={getAllOrders} header={true}/>
                {orders.map((order,index) => (
                    <OrderDetails key={index} orderId={order._id} product_id={order.product_id} quantity={order.quantity} order_date={order.order_date} status={order.status} orderPage={true} getAllOrders={getAllOrders} />
                ))}
                <Pagination page={page} setPage={setPage} totalPages={totalPages} style={{margin:"10px"}}/>
            </div>
        </div>
    )
}

export default OrdersPage;