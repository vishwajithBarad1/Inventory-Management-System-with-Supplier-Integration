const express = require("express");
const productController = require('../controllers/productController');
const { pagination } = require("../middlewares/pagination");
const { productModel } = require("../models/productModel");

const router  = express.Router()

router.post("/createProduct",productController.createProduct);
router.get("/getAllProducts",pagination(productModel),productController.getAllProducts);
router.put("/updateProduct",productController.updateProduct);
router.delete("/deleteProduct",productController.deleteProduct);

module.exports = router