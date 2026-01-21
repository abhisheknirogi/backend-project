const Order = require("../models/Order");

const createOrder = async (req, res) => {
  try {
    const { userId, products, amount, address } = req.body;

    if (!userId || !products || products.length === 0 || !amount || !address) {
      return res.status(400).json({ message: "Invalid data" });
    }

    const newOrder = await Order.create(req.body);
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

const updatePaymentStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        paymentStatus: req.body.paymentStatus,
        paymentProof: req.body.paymentProof,
      },
      { new: true }
    );
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getUserOrders,
  updatePaymentStatus,
};
