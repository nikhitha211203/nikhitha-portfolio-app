const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
    fullName: String,
    role: String,
    bio: String,
    profileUrl: String,
    resumeUrl: String,
    email: String,
    phone: String,
    education: [
        {
            degree: String,
            institution: String,
            year: String
        }
    ],
    experience: [
        {
            company: String,
            role: String,
            duration: String,
            description: String
        }
    ]
});

module.exports = mongoose.model('About', aboutSchema);
