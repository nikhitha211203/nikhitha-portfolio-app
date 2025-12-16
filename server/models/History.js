const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({
    jobTitle: { type: String, required: true },
    company: { type: String, required: true },
    duration: { type: String, required: true },
    description: { type: String },
});

const educationSchema = new mongoose.Schema({
    school: { type: String, required: true },
    degree: { type: String, required: true },
    duration: { type: String, required: true },
    description: { type: String },
});

module.exports = {
    Experience: mongoose.model("Experience", experienceSchema),
    Education: mongoose.model("Education", educationSchema),
};
