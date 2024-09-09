const express = require("express");
const router = express.Router();

const {
  addToCart,
  fetchCartItems,
  deleteCartItem,
  updateCart,
} = require("../Controller/cart/cartController");

router.post("/add", addToCart);
router.get("/get/:id", fetchCartItems);
router.delete("/delete/:userId/:productId", deleteCartItem);
router.put("/update", updateCart);

module.exports = router;
