const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const User = require("../models/user.js");
const passport = require('passport');
const { saveRedirectUrl } = require('../middleware.js');

const userController = require("../controller/user.js");

// Sign up route
router.get("/signup", userController.renderSignup);

router.post("/signup", wrapAsync(userController.signup));

router.get("/login", userController.renderLogin);

router.post("/login", saveRedirectUrl, passport.authenticate(/*enter strategy name*/"local", {
    failureFlash: true,   /*For Show Flash messages if login fails*/
    failureRedirect: "/login"   /*If login fails, redirect to login page*/
}), wrapAsync(userController.login));

router.get("/logout", userController.logout);

module.exports = router;