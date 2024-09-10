const express = require("express");
const supplierController = require('../controllers/supplierController');
const { supplierModel } = require("../models/supplierModel");
const { pagination } = require("../middlewares/pagination");

const router  = express.Router()

router.post("/createSupplier",supplierController.createSupplier);
router.get("/getAllSuppliers",pagination(supplierModel),supplierController.getAllSuppliers);
router.put("/updateSupplier",supplierController.updateSupplier);
router.delete("/deleteSupplier",supplierController.deleteSupplier);
router.get("/supplierProductDetails",supplierController.supplierProductDetails);

module.exports = router