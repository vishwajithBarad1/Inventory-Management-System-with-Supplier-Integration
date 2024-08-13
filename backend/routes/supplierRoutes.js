const express = require("express");
const supplierController = require('../controllers/supplierController');

const router  = express.Router()

router.post("/createSupplier",supplierController.createSupplier);
router.get("/getAllSuppliers",supplierController.getAllSuppliers);
router.put("/updateSupplier",supplierController.updateSupplier);
router.delete("/deleteSupplier",supplierController.deleteSupplier);
router.get("/supplierProductDetails",supplierController.supplierProductDetails);

module.exports = router