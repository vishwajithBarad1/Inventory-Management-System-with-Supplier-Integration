const orderModel = require("../models/orderModel");
const userModel = require("../models/userModel");
const productModel = require("../models/productModel");
const { productSupplierModel } = require("../models/productSupplierModel");
const { stockValueHistoryModel,inventoryMovementModel } = require("../models/reportingModels");

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

exports.productsSupplied = async (req,res)=>{
    try{
        const allProductSupplied = await productSupplierModel.find({}).populate("product_id").populate("supplier_id");
        let SupplierData = [];
        let ProductData = [];

        for(let i=0;i<allProductSupplied.length;i++){
            SupplierData.push(allProductSupplied[i].supplier_id);
            ProductData.push(allProductSupplied[i].product_id);
        }
        const productSupplierData = {ProductData,SupplierData}
        res.json({
            success:true,
            data:productSupplierData
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.stockValueOverTime = async (req,res)=>{
    try{
        const stock = await stockValueHistoryModel.find({})
        res.status(200).json({
            success:true,
            data:stock
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.inventoryMovement = async (req,res)=>{
    try{
        const movement = await inventoryMovementModel.find({})
        const restockMovement = await inventoryMovementModel.find({movement_type:"restock"})
        const saleMovement = await inventoryMovementModel.find({movement_type:"sale"})

        res.status(200).json({
            success:true,
            data:{movement,restockMovement,saleMovement}
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}






exports.mostSoldItems = async (req, res) => {
    try {
        // Fetch and aggregate sold products
        const topSoldProducts = await inventoryMovementModel.aggregate([
            { $match: { movement_type: "sale" } },
            {
                $group: {
                    _id: "$product_id",
                    totalQuantitySold: { $sum: "$quantity" }
                }
            },
            { $sort: { totalQuantitySold: -1 } },
            { $limit: 5 },
            { $lookup: {
                from: "products", // The name of the collection with product details
                localField: "_id",
                foreignField: "_id",
                as: "productDetails"
            }},
            { $unwind: "$productDetails" }
        ]);

        // Fetch and aggregate restocked products
        const topRestockedProducts = await inventoryMovementModel.aggregate([
            { $match: { movement_type: "restock" } },
            {
                $group: {
                    _id: "$product_id",
                    totalQuantityRestocked: { $sum: "$quantity" }
                }
            },
            { $sort: { totalQuantityRestocked: -1 } },
            { $limit: 5 },
            { $lookup: {
                from: "products", // The name of the collection with product details
                localField: "_id",
                foreignField: "_id",
                as: "productDetails"
            }},
            { $unwind: "$productDetails" }
        ]);

        // Send the response
        res.status(200).json({
            success: true,
            data: {
                topSoldProducts,
                topRestockedProducts
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
