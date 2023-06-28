const express = require('express');
const router = express.Router();
const User = require('../models').User;
const sha256 = require('sha256');
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const query = require('../interfaces/query/fetch');

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
  let result = await query.getAll(req,User);
  res.status(result.statusCode).json(result);
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
  const result = await query.getOne(req,User)
  if (result.statusCode ==200){
    res.user = result.data;
    next();
  }
  else{
    res.status(result.statusCode).json(result)
  }
}

module.exports = router;
