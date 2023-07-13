const express = require('express');
const router = express.Router();
require('dotenv').config()
const { customerSignUp, adminSignUp } = require('../controllers/register.controller')


router.post('/customer', customerSignUp);

router.post('/admin', adminSignUp);

module.exports = router;
