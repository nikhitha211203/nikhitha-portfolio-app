const express = require('express');
const router = express.Router();
const Theme = require('../models/Theme');
const auth = require('../middleware/authMiddleware');

// @route   GET /api/theme
// @desc    Get active theme
// @access  Public
router.get('/', async (req, res) => {
    try {
        let theme = await Theme.findOne();
        if (!theme) {
            theme = new Theme();
            await theme.save();
        }
        res.json(theme);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/theme
// @desc    Update theme
// @access  Private (Admin)
router.put('/', auth, async (req, res) => {
    const { primary, secondary, accent, bgDark, textMain } = req.body;

    try {
        let theme = await Theme.findOne();
        if (!theme) {
            theme = new Theme();
        }

        if (primary) theme.primary = primary;
        if (secondary) theme.secondary = secondary;
        if (accent) theme.accent = accent;
        if (bgDark) theme.bgDark = bgDark;
        if (textMain) theme.textMain = textMain;

        await theme.save();
        res.json(theme);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
