const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: { type: String },
        quantity: { type: Number, default: 1 },
      },
    ],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },

    paymentMethod: { type: String, default: "UPI" },

    paymentStatus: { type: String, default: "pending" }, // pending, confirmed, failed
    paymentProof: { type: String }, // image url or txn id

    orderStatus: { type: String, default: "pending" }, // pending, shipped, delivered, cancelled
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
