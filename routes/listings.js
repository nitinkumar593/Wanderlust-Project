const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const {isLoggedIn} = require("../middleware.js");

// middleware for validating the listing data using Joi
const validateListing = (req, res, next) => {

    const { error } = listingSchema.validate(req.body);
    if (error) {
        let errMessage = error.details.map((el) => el.message).join(","); // this will give us all the error messages in a single string
        throw new ExpressError(400, errMessage);
    } else {
        next();
    }
};

// index route
router.get("/", wrapAsync(async (req, res) => {
    const allListing = await Listing.find({});
    res.render("listings/index.ejs", { allListing });
}));

// New and Create route
router.get("/new", isLoggedIn ,(req, res) => {
    res.render("listings/new.ejs");
});

router.post("/", isLoggedIn,  validateListing, wrapAsync(async (req, res) => {
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id; // set the owner of the listing to the currently logged in user
    await newListing.save();
    req.flash("success", "New listing created!");
    res.redirect("/listings");
}));

// show route
router.get("/:id", wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews").populate("owner");
    if(!listing){
        req.flash("error","Listing you requested for does not exist!")
        return res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs", { listing });
}));

// Edit route
router.get("/:id/edit",  isLoggedIn, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
     if(!listing){
        req.flash("error","Listing you requested for does not exist!")
        return res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
}));

// Update route
router.put("/:id", isLoggedIn, validateListing, wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { new: true, runValidators: true });//in this i'm using spread operator (...) because it helps directly matches with schema
    req.flash("success", "Listing updated!");
    res.redirect(`/listings/${id}`);
}));

// delete route
router.delete("/:id", isLoggedIn, wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted!");
    res.redirect("/listings");
}));


module.exports = router;