const express = require('express');
const router = express.Router();
const Invite = require('../models').Invite;
const sha256 = require('sha256');
const bcrypt = require("bcrypt")
const crypto = require("crypto")

// Create a Invite
router.post('/', async (req, res) => {
  try {
    const Invite = await Invite.create(req.body);
    res.json(Invite);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Retrieve all Invites
router.get('/', async (req, res) => {
  try {
    const Invites = await Invite.findAll();
    res.json(Invites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Retrieve a Invite by ID
router.get('/:id', getInvite, (req, res) => {
  res.json(res.Invite);
});

// Update a Invite
router.patch('/:id', getInvite, async (req, res) => {
  try {
    await res.Invite.update(req.body);
    res.json(res.Invite);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a Invite
router.delete('/:id', getInvite, async (req, res) => {
  try {
    await res.Invite.destroy();
    res.json({ message: 'Invite deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get a Invite by ID
async function getInvite(req, res, next) {
  try {
    const Invite = await Invite.findByPk(req.params.id);
    if (!Invite) {
      return res.status(404).json({ message: 'Invite not found' });
    }
    res.Invite = Invite;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = router;
