const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const User = require("../models/user.js");
const passport = require('passport');
const { saveRedirectUrl } = require('../middleware.js');

// Sign up route
router.get("/signup", (req, res) => {
    res.render("users/signup.ejs");
});

router.post("/signup", wrapAsync(async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);

        // after successful registration, log in the user and redirect to listings page
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to Wanderlust!");
            res.redirect("/listings");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}));

router.get("/login", (req, res) => {
    res.render("users/login.ejs");
});

router.post("/login", saveRedirectUrl, passport.authenticate(/*enter strategy name*/"local", {
    failureFlash: true,   /*For Show Flash messages if login fails*/
    failureRedirect: "/login"   /*If login fails, redirect to login page*/
}), wrapAsync(async (req, res) => {
    req.flash("success", "Welcome back!");

    // after successful login, redirect to the page user wanted to access before login or to listings page if there is no such page
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}));

router.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "Logged out successfully!");
        res.redirect("/listings");
    });
});

module.exports = router;