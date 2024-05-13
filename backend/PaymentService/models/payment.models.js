const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  reason: {
    type: String,
    required: true,
  },
  paidBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  paidAmount: {
    type: Number,
    required: true,
  },
  paidDate: {
    type: Date,
    default: Date.now, // Automatically set to the current timestamp
  },
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
