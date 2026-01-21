const Cart = require("../models/Cart");

// Add or update product in cart
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Find cart by user
    let cart = await Cart.findOne({ userId: req.user.userId });

    if (cart) {
      // If product exists, update quantity
      const productIndex = cart.products.findIndex(
        (p) => p.productId === productId
      );

      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }
    } else {
      // Create new cart
      cart = new Cart({
        userId: req.user.userId,
        products: [{ productId, quantity }],
      });
    }

    const savedCart = await cart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Get logged in user's cart
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.userId });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Update cart items
const updateCart = async (req, res) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { userId: req.user.userId },
      { products: req.body.products },
      { new: true }
    );

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Delete cart (clear cart)
const deleteCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ userId: req.user.userId });
    res.status(200).json({ message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Admin only: get all carts
const getAllCarts = async (req, res) => {
  try {
    // Only admin can access this
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

module.exports = {
  addToCart,
  getCart,
  updateCart,
  deleteCart,
  getAllCarts,
};
