const orderModel = require("../models/orderModel");
const userModel = require("../models/userModel");
const productModel = require("../models/productModel");

exports.noOfOrders = async (req,res)=>{
    try{
        const orders =await orderModel.find({});
        res.status(200).json({
            success:true,
            data:orders.length
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.noOfUsers = async (req,res)=>{
    try{
        const users =await userModel.find({});
        res.status(200).json({
            success:true,
            data:users.length
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.produsctsBelowRLevel = async (req,res)=>{
    try{
        const allProducts = productModel.find({});
        const produsctsBelowRLevel = [];
        for(let product in allProducts){
            if(product[current_stock]<product[reorder_level]){
                produsctsBelowRLevel.push(product) 
            }
        }
        res.status(200).json({
            success:true,
            data:produsctsBelowRLevel
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

