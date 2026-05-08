const express = require('express');
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema } = require("../schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

// middleware for validating the review data using Joi
const validateReview = (req, res, next) => {

    const { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMessage = error.details.map((el) => el.message).join(","); // this will give us all the error messages in a single string
        throw new ExpressError(400, errMessage);
    } else {
        next();
    }
};

// Post Route
router.post("/",validateReview , wrapAsync (async(req, res) =>{
    // find Lisiting by id
    let listing = await Listing.findById(req.params.id);
    // Add new review from req.body/form
    let newReview = new Review(req.body.review);
    
    //Push new review in listing review 
    listing.reviews.push(newReview);

    // Save data in data base
    await newReview.save();
    await listing.save();

    res.redirect(`/listings/${listing._id}`)
}));

// delete route
router.delete("/:reviewId", wrapAsync(async (req, res) => {
    const { id , reviewId} = req.params;
    await Listing.findByIdAndUpdate(id , {$pull : {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`);
}));


module.exports = router;
