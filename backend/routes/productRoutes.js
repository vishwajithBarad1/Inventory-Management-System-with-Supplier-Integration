const express = require("express");
const productController = require('../controllers/productController');

const router  = express.Router()

router.post("/createProduct",productController.createProduct);
router.get("/getAllProducts",productController.getAllProducts);
router.put("/updateProduct",productController.updateProduct);
router.delete("/deleteProduct",productController.deleteProduct);

module.exports = router