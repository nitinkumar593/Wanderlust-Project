const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
// use multer for file upload
const multer = require('multer');
const {storage} = require("../cloudconfig.js");
const upload = multer({storage});

const lisitngController = require("../controller/listing.js");

// New and Create route
router.get("/new", isLoggedIn, lisitngController.renderNewForm);

router.route("/")
    .get(wrapAsync(lisitngController.index))
    .post(isLoggedIn, upload.single('listing[image]'), validateListing, wrapAsync(lisitngController.createListing));


router.route("/:id")
    .get(wrapAsync(lisitngController.showListing))
    .put(isLoggedIn, isOwner, validateListing, wrapAsync(lisitngController.updateListing))
    .delete(isLoggedIn, isOwner, wrapAsync(lisitngController.destroyListing));


// Edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(lisitngController.renderEditForm));


module.exports = router;