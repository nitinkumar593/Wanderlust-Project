const path = require("path");
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}


const mongoose = require("mongoose");
const User = require("../models/user");
const usersData = require("./data/users");

async function seedUsers() {
    try {
        await User.deleteMany({});

        for (let user of usersData) {
            const newUser = new User({
                email: user.email,
                username: user.username,
            });

            await User.register(newUser, "password123");
        }

        console.log(`${usersData.length} users added`);
    } catch (err) {
        console.log(err);
    }
}

async function main() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB Connected");

        await seedUsers();

        await mongoose.connection.close();
        console.log("Connection Closed");
    } catch (err) {
        console.log(err);
    }
}

main();

module.exports = seedUsers;