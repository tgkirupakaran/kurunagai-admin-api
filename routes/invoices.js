const express = require('express');
const router = express.Router();
const Invoice = require('../models/').Invoice;

// Create an invoice
router.post('/', async (req, res) => {
  try {
    const invoice = await Invoice.create(req.body);
    res.json(invoice);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Retrieve all invoices
router.get('/', async (req, res) => {
  try {
    const invoices = await Invoice.findAll();
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Retrieve an invoice by ID
router.get('/:id', getInvoice, (req, res) => {
  res.json(res.invoice);
});

// Update an invoice
router.patch('/:id', getInvoice, async (req, res) => {
  try {
    await res.invoice.update(req.body);
    res.json(res.invoice);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an invoice
router.delete('/:id', getInvoice, async (req, res) => {
  try {
    await res.invoice.destroy();
    res.json({ message: 'Invoice deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get an invoice by ID
async function getInvoice(req, res, next) {
  try {
    const invoice = await Invoice.findByPk(req.params.id);
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    res.invoice = invoice;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = router;
