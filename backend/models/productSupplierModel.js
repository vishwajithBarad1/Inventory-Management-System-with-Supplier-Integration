const {mongoose} = require("../db/connectDB");

const productSupplierSchema = mongoose.Schema({
        product_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product',
            require:true
        },
        supplier_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Supplier",
            require:true
        }
    }
)

const productSupplierModel = mongoose.model("ProductSupplier",productSupplierSchema);

module.exports = {productSupplierModel}