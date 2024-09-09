const Cart = require("../../Model/cartModel");
const Product = require("../../Model/productModel");
const mongoose = require("mongoose");

// Add to Cart Controller
exports.addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Validate input
    if (!userId || !productId || quantity == null || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided",
      });
    }

    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Find or create the user's cart
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [{ productId, quantity }] });
    } else {
      const existingItemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (existingItemIndex >= 0) {
        // Prevent the quantity from exceeding 5
        if (cart.items[existingItemIndex].quantity + quantity > 5) {
          return res.status(400).json({
            success: false,
            message: "Quantity cannot exceed 5",
          });
        }
        cart.items[existingItemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
    }

    // Save the updated cart
    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Product added to cart successfully",
      cart,
    });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Fetch Cart Items Controller
exports.fetchCartItems = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = id;

    // Find the user's cart and populate product details
    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "You have no cart currently",
      });
    }

    // Filter out invalid items
    const validItems = cart.items.filter((item) => item.productId);

    if (validItems.length !== cart.items.length) {
      cart.items = validItems;
      await cart.save();
    }

    // Calculate the total price
    const totalPrice = validItems.reduce(
      (total, item) => total + item.productId.salePrice * item.quantity,
      0
    );

    return res.status(200).json({
      success: true,
      message: "Cart fetched successfully",
      data: {
        items: validItems,
        totalItems: validItems.length,
        totalPrice,
      },
    });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Update Cart Controller
exports.updateCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Validate input
    if (!userId || !productId || quantity == null) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided",
      });
    }

    // Ensure the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found. It might have been deleted.",
      });
    }

    // Find the user's cart
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "No cart found for this user.",
      });
    }

    // Find the product in the cart
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart.",
      });
    }

    // Handle quantity update or remove the item if quantity is zero
    const currentQuantity = cart.items[itemIndex].quantity;

    // If quantity is zero, remove the item from the cart
    if (quantity === 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      // Restrict quantity between 1 and 5
      const newQuantity = currentQuantity + quantity;
      if (newQuantity < 1) {
        return res.status(400).json({
          success: false,
          message: "Quantity cannot be less than 1",
        });
      }

      if (newQuantity > 5) {
        return res.status(400).json({
          success: false,
          message: "Quantity cannot exceed 5",
        });
      }

      // Update the product quantity in the cart
      cart.items[itemIndex].quantity = newQuantity;
    }

    // Save the updated cart
    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      cart,
    });
  } catch (error) {
    console.error("Error updating cart:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


// Delete Cart Item Controller
exports.deleteCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    // Validate input
    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: "User ID and Product ID are required",
      });
    }

    // Find the user's cart
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "No cart found for this user",
      });
    }

    // Find the product in the cart and remove it
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }

    // Remove the product from the cart
    cart.items.splice(itemIndex, 1);

    // Save the updated cart
    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Product removed from cart",
      cart,
    });
  } catch (error) {
    console.error("Error deleting cart item:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

