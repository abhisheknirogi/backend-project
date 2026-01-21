const Payment = require("../models/Payment");

const getPaymentDetails = async (req, res) => {
  try {
    const payment = await Payment.findOne();
    res.json(payment);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getPaymentDetails };
