if (process.env.NODE_ENV !== "production") require("dotenv").config();
const mongoose = require("mongoose");

async function connectKharlAPI_DB () {
    try {
        await mongoose.connect(process.env.MONGODB_KHARLAPI_DB_URI);
        console.log("Connected to API Database Successfully!");
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};

module.exports = connectKharlAPI_DB;