const express = require('express');
const router = express.Router();
const passport = require("passport");
require('dotenv').config()

const { kurunagaiAuth, kurunagaiLogout } =require('../controllers/auth.controller')

router.post('/login', kurunagaiAuth);

router.get('/logout', kurunagaiLogout);

module.exports = router;
