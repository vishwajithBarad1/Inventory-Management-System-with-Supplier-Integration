const express = require("express");

const searchController = require("../controllers/searchController");

const router = express.Router();

router.get("/searchProduct", searchController.searchProducts);
router.get("/searchSupplier", searchController.searchSuppliers);
router.get("/searchOrder", searchController.searchOrders);

module.exports = router;