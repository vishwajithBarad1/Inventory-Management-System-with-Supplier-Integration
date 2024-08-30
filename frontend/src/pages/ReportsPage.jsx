import StockValueOverTime from "../components/StockValueOverTime"
import MovementOfInventory from "../components/MovementOfInventory";
import MostSoldItems from "../components/MostSoldItems";
import NavBar from "../components/NavBar";
function ReportsPage(){
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