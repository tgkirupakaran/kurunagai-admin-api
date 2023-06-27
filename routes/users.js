const express = require('express');
const router = express.Router();
const User = require('../models').User;
const sha256 = require('sha256');
const bcrypt = require("bcrypt")
const crypto = require("crypto")

// Create a user
router.post('/', async (req, res) => {
  try {
    req.body.id = sha256(req.body.email)
    req.body.password = sha256(req.body.password)
    
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Retrieve all users
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Retrieve a user by ID
router.get('/:id', getUser, (req, res) => {
  res.json(res.user);
});

// Update a user
router.patch('/:id', getUser, async (req, res) => {
  try {
    await res.user.update(req.body);
    res.json(res.user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a user
router.delete('/:id', getUser, async (req, res) => {
  try {
    await res.user.destroy();
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get a user by ID
async function getUser(req, res, next) {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.user = user;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = router;
