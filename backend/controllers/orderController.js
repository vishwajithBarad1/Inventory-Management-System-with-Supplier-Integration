const { orderModel } = require("../models/orderModel");
const {productModel} = require("../models/productModel");

const checkStock = async (req,res,product_id,quantity)=>{
    const product = await productModel.find({product_id});
    if(product.current_stock-quantity < product.reorder_level){
        const newOrder = new orderModel({product_id, quantity:product.stock, order_date:String(Date.now()).split("T")[0]});
        await newOrder.save();
    }
    if(product.current_stock-quantity > 0){
        await productModel.updateOne({product_id},{current_stock:current_stock-quantity})
    }else{
        return res.status(401).json({
            success:false,
            message:`cannot place the order there are ${product.current_stock} items left in the stock`
        })
    }
}

const updateStockLevel= async (id,value,quantity)=>{
    if(value=="Cancel"){
        const product = await productModel.find({_id:id})
        product.current_stock+=quantity;
        await product.save();
    }
}

exports.createOrder = async (req,res)=>{
    try{
        const {product_id, quantity, order_date} = req.body;
        checkStock(req,res,product_id,quantity);
        const newOrder = new orderModel({product_id, quantity, order_date});
        await newOrder.save();
        res.status(201).json({
            success:true,
            message:"created a order successfully"
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.getAllOrders = async (req,res)=>{
    try{
        const allOrders = await orderModel.find({});
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

