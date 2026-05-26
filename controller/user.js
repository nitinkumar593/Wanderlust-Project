const User = require("../models/user.js");


// Render Sign up form
module.exports.renderSignup = (req, res) => {
    res.render("users/signup.ejs");
}

// Sign up route
module.exports.signup = async (req, res) => {
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
}

// Render Login form
module.exports.renderLogin = (req, res) => {
    res.render("users/login.ejs");
}

// Login route
module.exports.login = async (req, res) => {
    req.flash("success", "Welcome back!");
    // after successful login, redirect to the page user wanted to access before login or to listings page if there is no such page
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

// Logout route
module.exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "Logged out successfully!");
        res.redirect("/listings");
    });
}