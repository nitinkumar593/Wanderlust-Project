const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

const lisitngController = require("../controller/listing.js");


// index route
router.get("/", wrapAsync(lisitngController.index));

// New and Create route
router.get("/new", isLoggedIn, lisitngController.renderNewForm);

router.post("/", isLoggedIn, validateListing, wrapAsync(lisitngController.createListing));

// show route
router.get("/:id", wrapAsync(lisitngController.showListing));

// Edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(lisitngController.renderEditForm));

// Update route
router.put("/:id", isLoggedIn, isOwner, validateListing, wrapAsync(lisitngController.updateListing));

// delete route
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(lisitngController.destroyListing));


module.exports = router;