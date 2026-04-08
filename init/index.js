const mongoose = require('mongoose');
const data = require('./data.js');
const Listing = require('../models/listing.js');

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

