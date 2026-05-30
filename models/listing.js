const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    image: {
        url: String,
        filename: String
    },
    price: {
        type: Number
    },
    location: {
        type: String
    },
    country: {
        type: String
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    geometry: {
        type: {
            type: String,
            enum: ['Point'],   // 'geometry.type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            required: true
        }
    },
    category: {
        type: String,
        enum: [
            "Trending",
            "Iconic City",
            "Amazing Pools",
            "Beach",
            "Amazing Views",
            "Cabins",
            "Lakefront",
            "Mountain",
            "Castles",
            "Camping",
            "Farms",
            "Arctic"
        ],
        required: true
    }
});

listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } })
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
