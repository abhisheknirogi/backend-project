const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());

// Import routes
const authRoute = require("./src/routes/authRoutes");
const productRoute = require("./src/routes/productRoutes");
const cartRoute = require("./src/routes/cartRoutes");
const orderRoute = require("./src/routes/orderRoutes");

// Import middleware
const { verifyToken, verifyAdmin } = require("./src/middleware/verifyToken");

// Routes
app.use("/api/auth", authRoute);

// Only admin can create/update/delete products
app.use("/api/products", verifyAdmin, productRoute);

// Cart routes (user only)
app.use("/api/carts", verifyToken, cartRoute);

// Orders routes (user only)
app.use("/api/orders", verifyToken, orderRoute);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Start server
app.listen(process.env.PORT || 5000, () => {
  console.log("Server running on port " + (process.env.PORT || 5000));
});
