const express = require('express');
const router = express.Router();
const Model = require('../models').Photo;
const query = require('../interfaces/query/fetch');
const create = require('../interfaces/command/create');
const update = require('../interfaces/command/update');
const del = require('../interfaces/command/delete');

// Create a Model
router.post('/', async (req, res) => {
  let result = await create.createOne(req,Model);
  res.status(result.statusCode).json(result);

});

// Retrieve all items
router.get('/', async (req, res) => {
  let result = await query.getAll(req,Model);
  res.status(result.statusCode).json(result);
});

// Retrieve a item by ID
router.get('/:id', getItem, (req, res) => {
  res.json(res.content);
});

// Update a item
router.patch('/:id', getItem, async (req, res) => {
  const result = await update.updateItem(req,res.item)
  res.status(result.statusCode).json(result);
});

// Delete a item
router.delete('/:id', getItem, async (req, res) => {
  const result = await del.deleteItem(res.item)
  res.status(result.statusCode).json(result);
});

// Middleware to get a item by ID
async function getItem(req, res, next) {
  const result = await query.getOneById(req,Model)
  if (result.statusCode ==200){
    res.item = result.data;
    res.content = result;
    next();
  }
  else{
    res.status(result.statusCode).json(result)
  }
}

module.exports = router;
