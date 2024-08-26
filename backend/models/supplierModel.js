const {mongoose} = require("../db/connectDB");

const supplierSchema = mongoose.Schema({
        name:{
            type:String,
            require:true,
            unique:true
        },
        contact_info:{
            type:String,
            require:true
        },
        productsSupplied:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product' // Reference to the Product schema if you have one
        }],
        isDeleted:{
            type:Boolean,
            default:false
        }
    }
)

const supplierModel = mongoose.model("Supplier",supplierSchema);

module.exports = {supplierModel}