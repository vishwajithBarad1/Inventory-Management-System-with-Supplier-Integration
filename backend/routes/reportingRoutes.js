const express = require("express");
const reportingController = require("../controllers/reportingController");

const router  = express.Router()

router.get("/getAllproductSuppliers",reportingController.productsSupplied);
router.get("/stockValueOverTime",reportingController.stockValueOverTime);
router.get("/inventoryMovement",reportingController.inventoryMovement);
router.get("/mostSoldItems",reportingController.mostSoldItems);
router.get("/dashboardReport",reportingController.dashboardReport);
router.get("/ordersWrtDate",reportingController.ordersWrtDate);
module.exports = router