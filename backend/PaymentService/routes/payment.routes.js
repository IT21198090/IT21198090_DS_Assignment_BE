const express = require("express");
const router = express.Router();
const {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
} = require("../controllers/payment.controller");

// Route to create a new payment
router.post("/payments", createPayment);

// Route to get all payments
router.get("/payments", getAllPayments);

// Route to get a specific payment by ID
router.get("/payments/:id", getPaymentById);

// Route to update a payment
router.put("/payments/:id", updatePayment);

// Route to delete a payment
router.delete("/payments/:id", deletePayment);

module.exports = router;
