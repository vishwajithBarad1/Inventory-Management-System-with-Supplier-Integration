const { productModel } = require("../models/productModel");
const { supplierModel } = require("../models/supplierModel");
const { orderModel } = require("../models/orderModel");
exports.searchProducts = async function(req,res){
    try{
        const {searchQuery,page,limit} = req.query;
        const skip = (page-1)*limit;
        const products = await productModel.find({$text:{$search:searchQuery.toLowerCase()},isDeleted: false}).skip(parseInt(skip)).limit(parseInt(limit)).exec();
        res.status(200).json({
            success:true,
            data:products
        });
    }catch(e){
        res.status(500).json({  
            success:false,
            message: "Server Error",
            message: e.message
        });
    }
}

exports.searchSuppliers = async function(req,res){
    try{
        const {searchQuery,page,limit} = req.query;
        const skip = (page-1)*limit;
        const suppliers = await supplierModel.find({$text:{$search:searchQuery.toLowerCase()},isDeleted: false}).skip(parseInt(skip)).limit(parseInt(limit)).exec();
        res.status(200).json({
            success:true,
            data: suppliers
        });
    }catch(e){
        res.status(500).json({  
            success:false,
            message: "Server Error",
            error: e.message
        });
    }
}

exports.searchOrders = async function(req,res){
    try{
        const {searchQuery,page,limit} = req.query;
        const skip = (page-1)*limit;
        const orders = await orderModel.find({$text:{$search:searchQuery.toLowerCase()}}).skip(parseInt(skip)).limit(parseInt(limit)).exec();
        res.status(200).json({
            success:true,
            data: orders
        });
    }catch(e){
        res.status(500).json({  
            success:false,
            message: "Server Error"
        });
    }
}