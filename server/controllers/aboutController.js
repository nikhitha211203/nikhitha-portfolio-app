const About = require("../models/About");

// @desc    Get about info
// @route   GET /api/about
exports.getAbout = async (req, res) => {
    try {
        const about = await About.findOne();
        if (!about) {
            // Return placeholder if empty
            return res.status(200).json({ name: "Your Name", bio: "Your bio" });
        }
        res.status(200).json(about);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update about info
// @route   POST /api/about (or PUT)
exports.updateAbout = async (req, res) => {
    try {
        let about = await About.findOne();

        if (about) {
            // Update
            Object.assign(about, req.body);
            const updatedAbout = await about.save();
            res.json(updatedAbout);
        } else {
            // Create
            const newAbout = new About(req.body);
            const savedAbout = await newAbout.save();
            res.status(201).json(savedAbout);
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
