require("dotenv").config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require("./models/listing.js");
const path = require("path");

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
    const newListing = new Listing(req.body);
    await newListing.save();
    res.redirect("/listings");
});

// show route
app.get("/listings/:id", async (req,res)=>{
    const {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
});

app.listen(8080, () => {
    console.log("Server is listening to port");
});
