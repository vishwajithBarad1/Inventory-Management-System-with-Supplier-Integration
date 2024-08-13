const express = require("express");
const orderController = require('../controllers/orderController');

const router  = express.Router()

router.post("/createOrder",orderController.createOrder);
router.get("/getAllOrder",orderController.getAllOrders);
router.put("/setCompleted",orderController.changeStatus("Completed"));
router.put("/setCancel",orderController.changeStatus("Cancelled"));

module.exports = router