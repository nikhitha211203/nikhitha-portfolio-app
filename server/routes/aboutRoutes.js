const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const About = require('../models/About');

// @route   GET api/about
// @desc    Get about info
// @access  Public
router.get('/', async (req, res) => {
    try {
        const about = await About.findOne();
        res.json(about || {});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/about
// @desc    Create or Update about info
// @access  Private
router.post('/', auth, async (req, res) => {
    try {
        let about = await About.findOne();
        if (about) {
            about = await About.findOneAndUpdate(
                {},
                { $set: req.body },
                { new: true }
            );
        } else {
            about = new About(req.body);
            await about.save();
        }
        res.json(about);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
