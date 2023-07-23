const express = require('express');
const router = express.Router();
const smsModel = require('../models').SMS;

const {
  postItem,
  patchItem,
  deleteItem, 
  getAll,
  getById,
  getItem 
} =require('../controllers/common.controller')

// Create a Model
router.post('/', setModel, postItem)

// Retrieve all items
router.get('/', setModel, getAll);

// Retrieve a item by ID
router.get('/:id', setModel, getItem, getById);

// Update a item
router.patch('/:id',setModel, getItem, patchItem);

// Delete a item
router.delete('/:id',setModel, getItem, deleteItem);


// Middleware to set model
async function setModel(req, res, next) {
  res.model = smsModel;
  next();
}

module.exports = router;