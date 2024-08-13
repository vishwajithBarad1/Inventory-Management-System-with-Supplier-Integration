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
        isDeleted:{
            type:Boolean,
            default:false
        }
    }
)

const supplierModel = mongoose.model("Supplier",supplierSchema);

module.exports = {supplierModel}