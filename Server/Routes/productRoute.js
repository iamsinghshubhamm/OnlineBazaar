const express = require("express");
const router = express.Router();

const {
  createProduct,
  deleteProduct,
  updateProduct,
  getAllProducts
} = require("../Controller/products/productController");

// Product route
router.post("/create-product", createProduct);
router.delete("/delete-product/:id", deleteProduct);
router.put("/update-product/:id", updateProduct);
router.get('/get-all-product', getAllProducts)

module.exports = router;
