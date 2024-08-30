const { client } = require("../db/connectRedis");
const { productSchema } = require("../middlewares/validationSchema");
const { productModel } = require("../models/productModel");
const {productSupplierModel} = require("../models/productSupplierModel");
const {stockValueHistoryModel} = require("../models/reportingModels");
const { supplierModel } = require("../models/supplierModel");
let productUpadated = true;
const UpdatestockValueHistory = async (req,res,quantity)=> {
    try{
        const latestStockValueHistory = await stockValueHistoryModel.find({}).sort({_id: -1});
        const prevStock =(latestStockValueHistory.length>0?latestStockValueHistory[0].total_stock_value:0)
        const newStockValueHistory = new stockValueHistoryModel({total_stock_value: Number(prevStock)+Number(quantity)});
        await newStockValueHistory.save();

    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.createProduct = async (req,res)=>{
    try{
        productUpadated = true;
        const {name, sku, description, price, current_stock, reorder_level,supplier_id} = req.body;
        const result = await productSchema.validateAsync({name, sku, description, price, current_stock, reorder_level,supplier_id})
        if(result.error){
            return res.status(400).json({
                successes:false,
                message:result.error.details[0].message
            })
        }
        const newProduct = new productModel({name, sku, description, price, current_stock, reorder_level,supplier_id});
        await newProduct.save();
        const newProductSupplier = new productSupplierModel({product_id:newProduct._id,supplier_id})
        await newProductSupplier.save();
        await supplierModel.updateOne({_id:supplier_id},{ $push: {productsSupplied:newProduct._id}});
        UpdatestockValueHistory(req,res,current_stock);

        res.status(201).json({
            success:true,
            message:"created a product successfully"
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.getAllProducts = async (req,res)=>{
    try{

        async function getProducts(){
            const allProducts = await productModel.find({isDeleted:false});
                client.setEx("products",3600,JSON.stringify(allProducts));
                productUpadated = false;
                res.status(200).json({
                    success:true,
                    data:allProducts
                });
        }

        if(productUpadated){
            const allProducts = await productModel.find({isDeleted:false});
            await getProducts();
            return
        }else{
            const redis_allProducts = await client.get("products");
            if(redis_allProducts!==null){
                res.status(200).json({
                    success:true,
                    data:JSON.parse(redis_allProducts)
                });
            }else{
                await getProducts();
                return
            }
        }
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.updateProduct = async (req,res)=>{
    try{
        productUpadated = true;
        const id = req.query.id;
        const {name, sku, description, price, current_stock, reorder_level,supplier_id} = req.body;

        const updateObj = {};
        if (name !== undefined) updateObj.name = name;
        if (sku !== undefined) updateObj.sku = sku;
        if (description !== undefined) updateObj.description = description;
        if (price !== undefined) updateObj.price = price;
        if (current_stock !== undefined) updateObj.current_stock = current_stock;
        if (reorder_level !== undefined) updateObj.reorder_level = reorder_level;
        if (supplier_id !== undefined) updateObj.supplier_id = supplier_id;

        const result = await productSchema.validateAsync(updateObj)
        if(result.error){
            return res.status(400).json({
                successes:false,
                message:result.error.details[0].message
            })
        }
        
        const response = await productModel.updateOne({_id:id},updateObj);
        
        const product = await productModel.findById(id);
        if(!(current_stock - product.current_stock)){
            await UpdatestockValueHistory(req,res,current_stock - product.current_stock);
        }
        
        if(!response.matchedCount){
            res.status(404).json({
                success:false,
                message:"cannot find the product"
            })
        }else{
            res.status(200).json({
                success: true,
                message: "Product updated successfully"
            });
        }
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.deleteProduct = async (req,res)=>{
    try{
        const id = req.query.id;
        const product = await productModel.findById(id);
        await UpdatestockValueHistory(req,res,(-1*product.current_stock));
        const response = await productModel.findById(id)
        const supplier_id = response.supplier_id
        response.isDeleted = true
        await response.save()
        console.log(response);
        const result = await supplierModel.updateOne(
            { _id: supplier_id }, // Filter criteria to find the supplier
            { $pull: { productsSupplied: response._id } } // Update operation to remove the productId
        );
        res.status(200).json({
            success:true,
            message:"successfully deleted the product"
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

