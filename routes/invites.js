const express = require("express");
const router = express.Router();
const inviteModel = require("../models").Invite;
const {
  postItem,
  patchItem,
  deleteItem, 
  getAll,
  getById,
  getItem 
} =require('../controllers/common.controller')
const { verifyEmail } =require('../controllers/invite.controller')

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

// Verifiy Email ID
router.get("/verify/:id",setModel, getItem, verifyEmail);

// Middleware to set model
async function setModel(req, res, next) {
  res.model = inviteModel;
  next();
}

module.exports = router;
