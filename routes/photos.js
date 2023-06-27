const express = require('express');
const router = express.Router();
const Photo = require('../models').Photo;
const sha256 = require('sha256');
const bcrypt = require("bcrypt")
const crypto = require("crypto")

// Create a Photo
router.post('/', async (req, res) => {
  try {
    const Photo = await Photo.create(req.body);
    res.json(Photo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Retrieve all Photos
router.get('/', async (req, res) => {
  try {
    const Photos = await Photo.findAll();
    res.json(Photos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Retrieve a Photo by ID
router.get('/:id', getPhoto, (req, res) => {
  res.json(res.Photo);
});

// Update a Photo
router.patch('/:id', getPhoto, async (req, res) => {
  try {
    await res.Photo.update(req.body);
    res.json(res.Photo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a Photo
router.delete('/:id', getPhoto, async (req, res) => {
  try {
    await res.Photo.destroy();
    res.json({ message: 'Photo deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get a Photo by ID
async function getPhoto(req, res, next) {
  try {
    const Photo = await Photo.findByPk(req.params.id);
    if (!Photo) {
      return res.status(404).json({ message: 'Photo not found' });
    }
    res.Photo = Photo;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = router;
