const express = require('express');
const router = express.Router();
const Payment = require('../models').Payment;

// Create a payment
router.post('/', async (req, res) => {
  try {
    const payment = await Payment.create(req.body);
    res.json(payment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Retrieve all payments
router.get('/', async (req, res) => {
  try {
    const payments = await Payment.findAll();
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Retrieve a payment by ID
router.get('/:id', getPayment, (req, res) => {
  res.json(res.payment);
});

// Update a payment
router.patch('/:id', getPayment, async (req, res) => {
  try {
    await res.payment.update(req.body);
    res.json(res.payment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a payment
router.delete('/:id', getPayment, async (req, res) => {
  try {
    await res.payment.destroy();
    res.json({ message: 'Payment deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get a payment by ID
async function getPayment(req, res, next) {
  try {
    const payment = await Payment.findByPk(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.payment = payment;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = router;
