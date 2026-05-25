const express = require('express');
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema } = require("../schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview ,isLoggedIn, isReviewAuthor} = require("../middleware.js");

// Post Route
router.post("/",isLoggedIn,validateReview , wrapAsync (async(req, res) =>{
    // find Lisiting by id
    let listing = await Listing.findById(req.params.id);
    // Add new review from req.body/form
    let newReview = new Review(req.body.review);
    // set the author of the review to the currently logged in user
    newReview.author = req.user._id; 
    //Push new review in listing review 
    listing.reviews.push(newReview);

    // Save data in data base
    await newReview.save();
    await listing.save();
    req.flash("success", "Review created!");
    res.redirect(`/listings/${listing._id}`)
}));

// delete route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(async (req, res) => {
    const { id , reviewId} = req.params;
    await Listing.findByIdAndUpdate(id , {$pull : {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review deleted!");
    res.redirect(`/listings/${id}`);
}));


module.exports = router;
