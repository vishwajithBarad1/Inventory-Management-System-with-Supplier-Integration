const {mongoose} = require("../db/connectDB");

const inventoryMovementSchema = new mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Product" 
    },
    movement_type: {
        type: String, 
        enum: ["restock", "sale"] 
    },
    quantity: Number,
    date: { 
        type: Date, 
        default: Date.now 
    }
});

const stockValueHistorySchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    total_stock_value: Number,
});

const supplierPerformanceSchema = new mongoose.Schema({
    supplier_id: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier" },
    average_delivery_time: Number, // Average time to deliver an order
    order_fulfillment_rate: Number, // Percentage of orders fulfilled on time
    date: { 
        type: Date, 
        default: Date.now 
    } // This could be aggregated over a period
});

const inventoryMovementModel = mongoose.model("inventoryMovement",inventoryMovementSchema);
const stockValueHistoryModel = mongoose.model("stockValueHistory",stockValueHistorySchema);
const supplierPerformanceModel  = mongoose.model("supplierPerformance",supplierPerformanceSchema);

module.exports = {inventoryMovementModel,stockValueHistoryModel,supplierPerformanceModel};