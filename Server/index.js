const express = require("express");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const PORT = process.env.PORT || 5000;
const connectDB = require("./Config/database");
const authRoute = require("./Routes/authRoute");
const productRoute = require("./Routes/productRoute");
const shoppingRoute = require("./Routes/shopRoute");
const cartRoute = require("./Routes/cartRoute");
const { cloudinaryConnect } = require("./Config/cloudinary");

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "https://online-bazaar-frontend.vercel.app",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

cloudinaryConnect();
connectDB();

// Routing
app.use("/api/auth", authRoute);
app.use("/api/product", productRoute);
app.use("/api/shopping", shoppingRoute);
app.use("/api/shopping/cart", cartRoute);

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

// Start server
app.listen(PORT, () => {
  console.log("\x1b[42m", `Client is running on port ${PORT}`, "\x1b[0m");
});
