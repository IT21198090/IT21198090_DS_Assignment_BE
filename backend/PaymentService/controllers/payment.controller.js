const Payment = require("../models/payment.models");
const stripe = require("stripe")(
  "sk_test_51PFCPmRwBaJjxNyjpm01tB2OVdoFi3vjgKTyjpR3HmJVzUqXyVKUfDXmbqOjKZKA510tGUnpRLj1M9FBGJCNOi1X00ME8rzz9Z"
);
// Create a new payment
exports.createPayment = async (req, res) => {
  try {
    const { reason, paidBy, paidAmount } = req.body;
    const lineItems = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: reason,
          },
          unit_amount: paidAmount,
        },
        quantity: 1,
      },
    ];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:3000/payment-success",
      cancel_url: "http://localhost:3000/payment-error",
    });

    const payment = new Payment({ reason, paidBy, paidAmount });
    await payment.save();
    res.status(201).send({ payment, id: session.id });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error creating payment", error: error.message });
  }
};

// Get all payments
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.send(payments);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error fetching payments", error: error.message });
  }
};

// Get a single payment by ID
exports.getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).send({ message: "Payment not found" });
    }
    res.send(payment);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error fetching payment", error: error.message });
  }
};

// Update a payment
exports.updatePayment = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!payment) {
      return res.status(404).send({ message: "Payment not found" });
    }
    res.send(payment);
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error updating payment", error: error.message });
  }
};

// Delete a payment
exports.deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.id);
    if (!payment) {
      return res.status(404).send({ message: "Payment not found" });
    }
    res.send({ message: "Payment deleted" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error deleting payment", error: error.message });
  }
};
