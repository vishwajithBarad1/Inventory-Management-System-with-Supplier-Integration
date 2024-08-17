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


const inventoryMovementModel = mongoose.model("inventoryMovement",inventoryMovementSchema);
const stockValueHistoryModel = mongoose.model("stockValueHistory",stockValueHistorySchema);

module.exports = {inventoryMovementModel,stockValueHistoryModel};