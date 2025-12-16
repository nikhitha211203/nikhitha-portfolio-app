const mongoose = require("mongoose");
const Admin = require("./models/Admin");
require("dotenv").config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected");

        const email = "nikhitha@gmail.com";
        const password = "Nikhitha@211203"; // Hardcoded initial password
        const name = "Nikhitha";

        // Check if exists
        const adminExists = await Admin.findOne({ email });
        if (adminExists) {
            console.log("Admin already exists. Updating password...");
            adminExists.password = password; // Will be hashed by pre("save")
            await adminExists.save();
            console.log("Admin password updated.");
        } else {
            await Admin.create({ name, email, password });
            console.log("Admin Created!");
        }

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedAdmin();
