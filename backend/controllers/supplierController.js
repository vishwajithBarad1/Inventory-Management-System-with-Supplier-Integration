const { supplierModel } = require("../models/supplierModel");
const {productSupplierModel} = require("../models/productSupplierModel");
const { supplierSchema } = require("../middlewares/validationSchema");
const { client } = require("../db/connectRedis");
(async ()=>{
    try{
        await client.set("supplierUpdated","true");
    }catch(e){
        console.log(e);
    }
    })();
exports.createSupplier = async (req,res)=>{
    try{
        await client.set("supplierUpdated","true");
        const {name,contact_info} = req.body;

        const response = await supplierSchema.validateAsync({name,contact_info})
        if(response.error){
            return res.status(400).json({
                success:false, 
                message:response.error.details[0].message
            });
        }

        const newSupplier = new supplierModel({name, contact_info});
        await newSupplier.save();
        
        res.status(201).json({
            success:true,
            message:"created a supplier successfully",
            supplier:newSupplier
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.getAllSuppliers = async (req,res)=>{
    try{
        async function getSuppliers(){
            const suppliers = req.paginatedResults;
            client.setEx("suppliers",3600,JSON.stringify(suppliers))
            await client.set("supplierUpdated","false");
            res.status(200).json({
                success:true,
                data:suppliers
            })
        }

        if((await client.get("supplierUpdated"))=="true"){
            await getSuppliers();
            return
        }else{
            const suppliers = JSON.parse(await client.get("suppliers"));
            if(suppliers!==null){
                res.status(200).json({
                    success:true,
                    data:suppliers
                });
            }else{
                await getSuppliers();
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

exports.updateSupplier = async (req,res)=>{
    try{
        await client.set("supplierUpdated","true");
        const id = req.query.id;
        const {name,contact_info} = req.body;

        const updateObj = {};
        if (name !== undefined) updateObj.name = name;
        if (contact_info !== undefined) updateObj.contact_info = contact_info;

        const result = await supplierSchema.validateAsync(updateObj)
        if(result.error){
            return res.status(400).json({
                success:false, 
                message:result.error.details[0].message
            });
        }

        const response = await supplierModel.updateOne({_id:id},updateObj)
        if(!response.matchedCount){
            res.status(404).json({
                success:false,
                message:"cannot find the supplier"
            })
        }else{
            await client.set("supplierUpdated","true");
            res.status(200).json({
                success: true,
                message: "Supplier updated successfully"
            });
        }
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.deleteSupplier = async (req,res)=>{
    try{
        await client.set("supplierUpdated","true");
        const id = req.query.id;
        const response = await supplierModel.updateOne({_id:id},{isDeleted:true})
        if(!response.matchedCount){
            res.status(404).json({
                success:false,
                message:"cannot find the supplier"
            })
        }else{
            res.status(200).json({
                success:true,
                message:"successfully deleted the supplier"
            })
        }
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.supplierProductDetails = async (req,res)=>{
    try{
        const P_S_details = await productSupplierModel.find({}).populate("product_id").populate("supplier_id");
        res.status(200).json({
            success:true,
            message:"successfully fetched all the details in populated raw format",
            data:P_S_details
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
