const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Skill = require('../models/Skill');

// @route   GET api/skills
// @desc    Get all skills
// @access  Public
router.get('/', async (req, res) => {
    try {
        const skills = await Skill.find().sort({ category: 1 });
        res.json(skills);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/skills
// @desc    Create a skill
// @access  Private
router.post('/', auth, async (req, res) => {
    try {
        const newSkill = new Skill(req.body);
        const skill = await newSkill.save();
        res.json(skill);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/skills/:id
// @desc    Update a skill
// @access  Private
router.put('/:id', auth, async (req, res) => {
    try {
        let skill = await Skill.findById(req.params.id);
        if (!skill) return res.status(404).json({ msg: 'Skill not found' });

        skill = await Skill.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.json(skill);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/skills/:id
// @desc    Delete a skill
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        let skill = await Skill.findById(req.params.id);
        if (!skill) return res.status(404).json({ msg: 'Skill not found' });

        await Skill.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Skill removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
