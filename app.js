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
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);

app.get("/", (req, res) => {
    res.send("Port is working");
});

// index route
app.get("/listings",wrapAsync( async (req,res)=>{
    const allListing = await Listing.find({});
    res.render("listings/index.ejs",{allListing});
}));

// New and Create route
app.get("/listings/new" , (req,res)=>{
    res.render("listings/new.ejs");
});

app.post("/listings",wrapAsync(async (req,res)=>{
    // validation for create route
    if(!req.body.listing){
        throw new ExpressError(400,"Invalid Listing Data");
    }
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
}));

// show route
app.get("/listings/:id",wrapAsync( async (req,res)=>{
    const {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
}));

// Edit route
app.get("/listings/:id/edit", wrapAsync(async (req,res)=>{
    const {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
}));

// Update route
app.put("/listings/:id", wrapAsync(async (req,res)=>{
    // validation for update route
    if(!req.body.listing){
        throw new ExpressError(400,"Invalid Listing Data");
    }   
    const {id} = req.params;    
    await Listing.findByIdAndUpdate(id, {...req.body.listing},{ new: true, runValidators: true });//in this i'm using spread operator (...) because it helps directly matches with schema
    res.redirect(`/listings/${id}`);
}));

// delete route
app.delete("/listings/:id",wrapAsync( async (req,res)=> {
    const {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
}));

// handling all other routes which are not defined
app.all("*", (req,res,next)=>{
    next(new ExpressError(404,"Page Not Found"));
});

// error handling middleware
app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render("error.ejs", {message});
});

app.listen(8080, () => {
    console.log("Server is listening to port");
});
