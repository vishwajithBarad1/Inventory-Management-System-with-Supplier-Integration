const express = require("express");
const orderController = require('../controllers/orderController');
const { pagination } = require("../middlewares/pagination");
const { orderModel } = require("../models/orderModel");

const router  = express.Router()

router.post("/createOrder",orderController.createOrder);
router.get("/getAllOrder",pagination(orderModel),orderController.getAllOrders);
router.put("/setCompleted",orderController.changeStatus("Completed"));
router.put("/setCancel",orderController.changeStatus("Cancelled"));

module.exports = router