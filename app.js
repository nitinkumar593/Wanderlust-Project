require("dotenv").config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require('connect-flash');
// all require is for authentication
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user.js');


// Require Route from routes folder
const listings = require("./routes/listings.js");
const reviews = require("./routes/reviews.js");

main()
    .then(() => {
        console.log("Connection Successful");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(process.env.MONGO_URL);
}

app.set("view engine ", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);

const sessionOptions = {
    secret : "mysupersectate",
    resave : false,
    saveUninitialized : true,
    cookie : {
        expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge : 7 * 24 * 60 * 60 * 1000,
        httpOnly : true
    },
};
// use session 
app.use(session(sessionOptions));
app.use(flash());

// for authentication
app.use(passport.initialize());
app.use(passport.session());
passpot.use(new LocalStrategy(User.authenticate()));
// For save and Unsave user info in session
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// middleware for flash
app.use((req,res,next) =>{
   res.locals.success = req.flash("success");
   res.locals.error = req.flash("error");
   next(); 
});

// Use Routes 
app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);


// handling all other routes which are not defined
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

app.get("/", (req, res) => {
    res.send("Port is working");
});

// error handling middleware
app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render("error.ejs", { message });
});

app.listen(8080, () => {
    console.log("Server is listening to port");
});
