const Listing = require("../models/listing.js");

// index 
module.exports.index = async (req, res) => {
    const allListing = await Listing.find({});
    res.render("listings/index.ejs", { allListing });
}

// get route for render new listing form
module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
}

// post route for create listing
module.exports.createListing = async (req, res) => {
    let url = req.file.path;
    let filename = req.file.filename;
    req.body.listing.image = { url, filename };
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    await newListing.save();
    req.flash("success", "New listing created!");
    res.redirect("/listings");
}

// show route
module.exports.showListing = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate({ path: "reviews", populate: { path: "author" } }).populate("owner");
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!")
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
}

// edit route
module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!")
        return res.redirect("/listings");
    }

    let orignalImageUrl = listing.image.url;
     orignalImageUrl = orignalImageUrl.replace("/upload", "/upload/w_300"); // this will give us the image with width of 300px
    res.render("listings/edit.ejs", { listing, orignalImageUrl });
}

// update route
module.exports.updateListing = async (req, res) => {
    const { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { new: true, runValidators: true });//in this i'm using spread operator (...) because it helps directly matches with schema
    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }
    req.flash("success", "Listing updated!");
    res.redirect(`/listings/${id}`);
}

// delete route
module.exports.destroyListing = async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted!");
    res.redirect("/listings");
}