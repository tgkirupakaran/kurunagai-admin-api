const express = require('express');
const router = express.Router();
const passport = require("passport");
require('dotenv').config()

const { googleAuthSuccess, googleAuthFailed, googleLogout } =require('../controllers/auth.controller')

router.get('/logout', googleLogout);

router.get('/login/success', googleAuthSuccess);

router.get('/login/failed', googleAuthFailed);

router.get('/google',passport.authenticate("google", ["profile", "email"]));

router.get('/callback',passport.authenticate("google", {
  successRedirect: process.env.CLIENT_URL,
  failureRedirect: "/login/failed",
}));

module.exports = router;
