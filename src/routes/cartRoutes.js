const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/verifyToken");

const {
  addToCart,
  getCart,
  updateCart,
  deleteCart,
  getAllCarts,
} = require("../controllers/cartController");

router.post("/", verifyToken, addToCart);
router.put("/:id", verifyToken, updateCart);
router.delete("/:id", verifyToken, deleteCart);
router.get("/find/:userId", verifyToken, getCart);
router.get("/", verifyToken, getAllCarts);

module.exports = router;
