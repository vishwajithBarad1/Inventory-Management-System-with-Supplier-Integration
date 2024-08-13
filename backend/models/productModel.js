const {mongoose} = require("../db/connectDB");

const productSchema = mongoose.Schema({
        name:{
            type:String,
            require:true
        },
        sku:{
            type:String,
            require:true,
            unique:true
        },
        description:{
            type:String,
            require:true
        },
        price:{
            type:Number,
            require:true
        },
        current_stock:{
            type:Number,
            require:true
        },
        reorder_level:{
            type:Number,
            require:true,
        },
        supplier_id:{
            type:mongoose.Schema.Types.ObjectId,
            require:true,
            ref:"Supplier"
        },
        stock:{
            type:Number,
            default:function(){return this.current_stock}
        },
        isDeleted:{
            type:Boolean,
            default:false
        }
    }
)

const productModel = mongoose.model("Product",productSchema);

module.exports = {productModel}