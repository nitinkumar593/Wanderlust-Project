require("dotenv").config({ path: "../.env" });
const mongoose = require('mongoose');
const initData = require('./data.js');
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

const initDB = async () => {
    await Listing.insertMany(initData.data);
    console.log("Data was initalized");
}

initDB();