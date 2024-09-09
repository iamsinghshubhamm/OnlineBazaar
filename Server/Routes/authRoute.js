const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logout,
  authMiddleware
} = require("../Controller/auth/authController");

const {createProduct} = require('../Controller/products/productController')

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logout);
router.get('/check-auth', authMiddleware, (req, res) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        message: 'Authenticated User',
        user: user
    });
});

// Product route

router.post('/create-product', createProduct )

module.exports = router;
