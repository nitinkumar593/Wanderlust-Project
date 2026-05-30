const path = require("path");
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const mongoose = require("mongoose");

const Listing = require("../models/listing");
const Review = require("../models/review");
const User = require("../models/user");

const listingsData = require("./data/listings");
const reviewsData = require("./data/reviews");

async function seedListingsAndReviews() {

    await Review.deleteMany({});
    await Listing.deleteMany({});

    const users = await User.find();

    if (users.length === 0) {
        throw new Error("No users found. Run seedUsers.js first.");
    }

    for (let listingData of listingsData) {

        const randomOwner =
            users[Math.floor(Math.random() * users.length)];

        const listing = new Listing({
            ...listingData,
            owner: randomOwner._id,

            geometry: {
                type: "Point",
                coordinates: [
                    77 + Math.random(),
                    28 + Math.random()
                ]
            }
        });

        for (let i = 0; i < 5; i++) {

            const randomReview =
                reviewsData[Math.floor(Math.random() * reviewsData.length)];

            const randomUser =
                users[Math.floor(Math.random() * users.length)];

            const review = new Review({
                comment: randomReview.comment,
                rating: randomReview.rating,
                author: randomUser._id,
            });

            await review.save();

            listing.reviews.push(review._id);
        }

        await listing.save();
    }

    console.log("Listings & Reviews Seeded Successfully");
}

async function main() {
    try {
        await mongoose.connect(process.env.MONGO_URL);

        console.log("MongoDB Connected");

        await seedListingsAndReviews();

        await mongoose.connection.close();

        console.log("Connection Closed");

    } catch (err) {
        console.log(err);
    }
}

main();

module.exports = seedListingsAndReviews;