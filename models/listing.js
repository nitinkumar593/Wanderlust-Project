const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title:{
        type: String,
        require: true,
    },
    description:{
        type: String
    },
    image:{
        type: String,
        default: "https://plus.unsplash.com/premium_photo-1677474827617-6a7269f97574?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bHV4dXJ5JTIwaG90ZWx8ZW58MHx8MHx8fDA%3D",
        set: (v) => v===""?"https://plus.unsplash.com/premium_photo-1677474827617-6a7269f97574?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bHV4dXJ5JTIwaG90ZWx8ZW58MHx8MHx8fDA%3D":v,
    },
    price:{
        type: Number
    },
    location:{
        type: String
    },
    country:{
        type: String
    },
});

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;
