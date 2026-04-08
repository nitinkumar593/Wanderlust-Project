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
        default: "https://unsplash.com/photos/coconut-tree-near-shore-within-mountain-range-RN6ts8IZ4_0",
        set: (v) => v===""?"https://unsplash.com/photos/coconut-tree-near-shore-within-mountain-range-RN6ts8IZ4_0":v,
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
