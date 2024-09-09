const User = require("../../Model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.registerUser = async (req, res) => {
  const { userName, email, password, phoneNumber, confirmPassword } = req.body;

  if (!userName || !email || !password || !phoneNumber || !confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Passwords do not match",
    });
  }

  try {
    const checkUser = await User.findOne({ email: email });
    if (checkUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      userName,
      email,
      password: hashedPassword,
      phoneNumber,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: newUser,
    });
  } catch (error) {
    console.error("Error during user registration:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist, please register",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password, please try again",
      });
    }

    // Create JWT payload
    const payload = {
      email: user.email,
      id: user._id,
      role: user.role,
      userName : user.userName
    };

    // Sign the JWT token
    const token = jwt.sign(payload, process.env.JWT_Token, {
      expiresIn: "2h",
    });

    // Set token in cookies
    const options = {
      httpOnly: true,
      secure: false,
      maxAge: 2 * 60 * 60 * 1000,
    };

    // Remove sensitive fields before sending the user object
    user.password = undefined;

    // Send the response with the token set in a cookie
    res.cookie("token", token, options).status(200).json({
      success: true,
      token,
      user,
      message: "Logged in successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error, please try again later",
    });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfullt",
  });
};

exports.authMiddleware = async (req, res, next) => {
    const token = req.cookies.token; 
    if (!token) {
        return res.status(400).json({
            success: false,
            message: "Unauthorized",
        });
    }
    try {
        const decode = await jwt.verify(token, process.env.JWT_Token);
        req.user = decode;
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Unauthorized user!",
        });
    }
};
