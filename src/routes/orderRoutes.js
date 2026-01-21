const express = require("express");
const router = express.Router();
const {
  createOrder,
  getOrders,
  getUserOrders,
  updatePaymentStatus,
} = require("../controllers/orderController");

const { verifyToken, verifyAdmin } = require("../middleware/verifyToken");

// Create order
router.post("/", verifyToken, createOrder);

// Get all orders (Admin)
router.get("/", verifyToken, verifyAdmin, getOrders);

// Get user orders
router.get("/find/:userId", verifyToken, getUserOrders);

// Update payment status
router.put("/pay/:id", verifyToken, updatePaymentStatus);

module.exports = router;
