const mongoose = require("mongoose");
require("dotenv").config();

console.log("-----------------------------------------");
console.log("Checking Database Connection...");
console.log("URI Length:", process.env.MONGO_URI ? process.env.MONGO_URI.length : "UNDEFINED");
console.log("-----------------------------------------");

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ SUCCESS: Connected to MongoDB!");
        process.exit(0);
    })
    .catch((err) => {
        console.log("❌ ERROR: Connection Failed!");
        console.log(err.name, err.message);
        if (err.reason) console.log("Reason:", err.reason);
        process.exit(1);
    });
