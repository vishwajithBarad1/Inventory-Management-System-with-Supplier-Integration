require("dotenv").config()
const {mongoose} = require('./db/connectDB')

const cors = require("cors");
const express = require("express");

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require("./routes/orderRoutes");
const supplierRoutes = require("./routes/supplierRoutes");
const reportingRoutes = require("./routes/reportingRoutes");

const {protect} = require("./middlewares/auth")
const app = express();

app.use(express.json());
app.use(cors());

app.use("/user",userRoutes);
app.use("/supplier",protect,supplierRoutes);
app.use("/product",protect,productRoutes);
app.use("/order",protect,orderRoutes);
app.use("/report",protect,reportingRoutes);


app.listen( process.env.PORT,()=>{
    console.log("your server is listining on port",process.env.PORT)
})
