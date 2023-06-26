const express = require('express');
const router = express.Router();
const Subscription = require('../models').Subscription;

// Create a subscription
router.post('/', async (req, res) => {
  try {
    const subscription = await Subscription.create(req.body);
    res.json(subscription);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Retrieve all subscriptions
router.get('/', async (req, res) => {
  try {
    const subscriptions = await Subscription.findAll();
    res.json(subscriptions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Retrieve a subscription by ID
router.get('/:id', getSubscription, (req, res) => {
  res.json(res.subscription);
});

// Update a subscription
router.patch('/:id', getSubscription, async (req, res) => {
  try {
    await res.subscription.update(req.body);
    res.json(res.subscription);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a subscription
router.delete('/:id', getSubscription, async (req, res) => {
  try {
    await res.subscription.destroy();
    res.json({ message: 'Subscription deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get a subscription by ID
async function getSubscription(req, res, next) {
  try {
    const subscription = await Subscription.findByPk(req.params.id);
    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }
    res.subscription = subscription;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = router;
