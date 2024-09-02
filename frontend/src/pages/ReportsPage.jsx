import StockValueOverTime from "../components/StockValueOverTime"
import MovementOfInventory from "../components/MovementOfInventory";
import MostSoldItems from "../components/MostSoldItems";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function ReportsPage(){
    const navigate = useNavigate();
    useEffect(() => {
        if(!localStorage.getItem("authToken")){
            navigate("/");
            return;
        }
    }, []);
    return(
        <div style={{height:"100vw"}}>
            <div className="dashboard-container" >
                <NavBar page={"report"}/>
                <div className="reports-container">
                <div className="stockValueOverTime-container">
                    <StockValueOverTime/>
                </div>
                <div className="inventory-movement-container">
                    <MovementOfInventory/>
                </div>
                </div>
                <MostSoldItems/>
            </div>
        </div>
    )
}

export default ReportsPage;