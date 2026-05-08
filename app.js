require("dotenv").config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");
const Review = require("./models/review.js");

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

app.get("/", (req, res) => {
    res.send("Port is working");
});

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

// index route
app.get("/listings", wrapAsync(async (req, res) => {
    const allListing = await Listing.find({});
    res.render("listings/index.ejs", { allListing });
}));

// New and Create route
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
});

app.post("/listings", validateListing, wrapAsync(async (req, res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
}));

// show route
app.get("/listings/:id", wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs", { listing });
}));

// Edit route
app.get("/listings/:id/edit", wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
}));

// Update route
app.put("/listings/:id", validateListing, wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { new: true, runValidators: true });//in this i'm using spread operator (...) because it helps directly matches with schema
    res.redirect(`/listings/${id}`);
}));

// delete route for listings
app.delete("/listings/:id", wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
}));

// Reviews Post Route
app.post("/listings/:id/reviews",validateReview , wrapAsync (async(req, res) =>{
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

// delete route For reviews
app.delete("/listings/:id/reviews/:reviewId", wrapAsync(async (req, res) => {
    const { id , reviewId} = req.params;
    await Listing.findByIdAndUpdate(id , {$pull : {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`);
}));

// handling all other routes which are not defined
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

// error handling middleware
app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render("error.ejs", { message });
});

app.listen(8080, () => {
    console.log("Server is listening to port");
});
