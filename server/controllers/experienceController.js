const { Experience, Education } = require("../models/History");

// --- Experience ---
exports.getExperiences = async (req, res) => {
    try {
        const experiences = await Experience.find();
        res.status(200).json(experiences);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createExperience = async (req, res) => {
    const experience = new Experience(req.body);
    try {
        const newExperience = await experience.save();
        res.status(201).json(newExperience);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteExperience = async (req, res) => {
    try {
        const experience = await Experience.findById(req.params.id);
        if (!experience) return res.status(404).json({ message: "Experience not found" });
        await experience.deleteOne();
        res.json({ message: "Experience removed" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// --- Education ---
exports.getEducation = async (req, res) => {
    try {
        const education = await Education.find();
        res.status(200).json(education);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createEducation = async (req, res) => {
    const education = new Education(req.body);
    try {
        const newEducation = await education.save();
        res.status(201).json(newEducation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteEducation = async (req, res) => {
    try {
        const education = await Education.findById(req.params.id);
        if (!education) return res.status(404).json({ message: "Education not found" });
        await education.deleteOne();
        res.json({ message: "Education removed" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
