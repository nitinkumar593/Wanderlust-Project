const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema , reviewSchema} = require("./schema.js");

// middleware for check if user is logged in or not
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be signed in first!");
        return res.redirect("/login");
    } else {
        next();
    }
};

// middleware for save session redirect url in local redirect url
module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

// middleware for listing Authorization
module.exports.isOwner = async(req, res, next) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if (!listing.owner._id.equals(req.user._id)) {
        req.flash("error", "You are not the owner of this listing!");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

// middleware for review Authorization
module.exports.isReviewAuthor = async(req, res, next) => {
    let {id, reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if (!review.author._id.equals(req.user._id)) {
        req.flash("error", "You are not the owner of this review!");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

// middleware for validating the listing data using Joi
module.exports.validateListing = (req, res, next) => {

    const { error } = listingSchema.validate(req.body);
    if (error) {
        let errMessage = error.details.map((el) => el.message).join(","); // this will give us all the error messages in a single string
        throw new ExpressError(400, errMessage);
    } else {
        next();
    }
};


// middleware for validating the review data using Joi
module.exports.validateReview = (req, res, next) => {

    const { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMessage = error.details.map((el) => el.message).join(","); // this will give us all the error messages in a single string
        throw new ExpressError(400, errMessage);
    } else {
        next();
    }
};