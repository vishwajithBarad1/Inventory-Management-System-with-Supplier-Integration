const {mongoose} = require("../db/connectDB");

const orderSchema = mongoose.Schema({
        product_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product',
            require:true
        },
        quantity:{
            type:Number,
            require:true,
        },
        order_date:{
            type:Date,
            require:true,
            default:Date.now()
        },
        status:{
            type:String,
            enum:["Pending","Completed","Cancelled"],
            default:"Pending"
        }
    }
)

const orderModel = mongoose.model("Order",orderSchema);

module.exports = {orderModel}