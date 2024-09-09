const express = require("express");
const router = express.Router();

const {
  getFilteredProducts,
  getProductDetails
} = require("../Controller/shopping/productsController");

// Product route
router.get("/get-filter-product", getFilteredProducts);
router.get("/get-product-details/:id", getProductDetails)

module.exports = router;
