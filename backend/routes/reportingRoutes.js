const express = require("express");
const reportingController = require("../controllers/reportingController");

const router  = express.Router()

router.get("/getAllproductSuppliers",reportingController.productsSupplied);
router.get("/stockValueOverTime",reportingController.stockValueOverTime);
router.get("/inventoryMovement",reportingController.inventoryMovement);
router.get("/mostSoldItems",reportingController.mostSoldItems);
router.get("/produsctsBelowRLevel",reportingController.produsctsBelowRLevel);
module.exports = router