const express = require("express");
const router = express.Router();
const { getPaymentDetails } = require("../controllers/paymentController");

router.get("/", getPaymentDetails);

module.exports = router;
