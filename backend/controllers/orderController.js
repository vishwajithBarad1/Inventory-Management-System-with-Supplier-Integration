const { orderModel } = require("../models/orderModel");
const {productModel} = require("../models/productModel");
const {inventoryMovementModel,stockValueHistoryModel} = require("../models/reportingModels");

const checkStock = async (req,res,product_id,quantity)=>{
    const product = await productModel.find({_id:product_id});
    // Check if stock is below reorder level
    if(product[0].current_stock-quantity < product[0].reorder_level && product[0].current_stock - quantity > 0){
        const newOrder = new orderModel({
            product_id, 
            quantity:product[0].stock, 
            order_date:String(Date.now()).split("T")[0],
            status: "Completed",
        });
        await newOrder.save();

        product[0].current_stock=product[0].current_stock + product[0].stock-quantity; 
        await product[0].save();
        //since product is restocked, we need to update newInventoryMovement
        const newInventoryMovement = new inventoryMovementModel({
            product_id,
            movement_type:"restock",
            quantity:product[0].stock
        });
        await newInventoryMovement.save();
    }else{
         // Check if current_stock is insufficient
        if (product[0].current_stock - quantity < 0) {
            return res.status(401).json({
                success: false,
                message: `Cannot place the order, there are ${product[0].current_stock} items left in stock`
            });
        } else {
            // Update stock if enough items are available
            product[0].current_stock= product[0].current_stock - quantity;
        }
        await product[0].save();
    }
}

const UpdatestockValueHistory = async (req,res,quantity)=> {
    try{
        const latestStockValueHistory = await stockValueHistoryModel.find({}).sort({_id: -1});
        const prevStock =(latestStockValueHistory.length>0?latestStockValueHistory[0].total_stock_value:0)
        const newStockValueHistory = new stockValueHistoryModel({total_stock_value: prevStock-quantity});
        await newStockValueHistory.save();
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const updateStockLevel= async (id,value,quantity)=>{
    if(value=="Cancel"){
        const product = await productModel.find({_id:id});
        product[0].current_stock+=quantity;
        await product[0].save();
    }
}

exports.createOrder = async (req,res)=>{
    try{
        const {product_id, quantity, order_date} = req.body;
        // Check stock availability and proceed with order creation
        await checkStock(req,res,product_id,quantity);
        if (!res.headersSent) {
            // Ensure the stock is updated before proceeding
            await UpdatestockValueHistory(req,res,quantity);
            // If checkStock did not send a response, continue to create the order
            const newOrder = new orderModel({product_id, quantity, order_date});
            await newOrder.save();
            const newInventoryMovement = new inventoryMovementModel({product_id,movement_type:"sale",quantity});
            await newInventoryMovement.save();
            res.status(201).json({
                success:true,
                message:"created a order successfully"
            })
        }
    }catch(error){
        if (!res.headersSent) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}

exports.getAllOrders = async (req,res)=>{
    try{
        const allOrders = await orderModel.find({}).populate('product_id');;
        res.status(200).json({
            success:true,
            data:allOrders
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.changeStatus = (value)=>{
    return  async (req,res)=>{
        try{
            const id = req.query.id;
            const order = await orderModel.find({_id:id});
            updateStockLevel(id,value,order.quantity);
            UpdatestockValueHistory(req,res,order.quantity);
            const response = await orderModel.updateOne({_id:id},{status:value})
            if(!response.matchedCount){
                res.status(404).json({
                    success:false,
                    message:"cannot find the order"
                })
            }else{
                res.status(200).json({
                    success: true,
                    message: "order updated successfully"
                });
            }
        }catch(error){
            res.status(500).json({
                success:false,
                message:error.message
            })
        }
    }    
}