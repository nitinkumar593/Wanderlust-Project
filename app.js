require("dotenv").config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

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
app.set("view engine ","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);

app.get("/", (req, res) => {
    res.send("Port is working");
});

// index route
app.get("/listings",async (req,res)=>{
    const allListing = await Listing.find({});
    res.render("listings/index.ejs",{allListing});
});

// New and Create route
app.get("/listings/new" , (req,res)=>{
    res.render("listings/new.ejs");
});

app.post("/listings", async (req,res)=>{
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
});

// show route
app.get("/listings/:id", async (req,res)=>{
    const {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
});

// Edit route
app.get("/listings/:id/edit", async (req,res)=>{
    const {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
});

// Update route
app.put("/listings/:id", async (req,res)=>{
    const {id} = req.params;    
    await Listing.findByIdAndUpdate(id, {...req.body.listing},{ new: true, runValidators: true });//in this i'm using spread operator (...) because it helps directly matches with schema
    res.redirect(`/listings/${id}`);
});

// delete route
app.delete("/listings/:id", async (req,res)=> {
    const {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
});

app.listen(8080, () => {
    console.log("Server is listening to port");
});
