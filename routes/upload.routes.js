const express = require('express');
const router = express.Router();
const passport = require("passport");
require('dotenv').config()

const upload = require("../middleware/uploader");
const { uploadFiles } =require('../controllers/upload.controller')

router.post('/', upload.single('file'),uploadFiles);

module.exports = router;
