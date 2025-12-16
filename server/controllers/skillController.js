const Skill = require("../models/Skill");

// @desc    Get all skills
// @route   GET /api/skills
exports.getSkills = async (req, res) => {
    try {
        const skills = await Skill.find();
        res.status(200).json(skills);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a skill
// @route   POST /api/skills
exports.createSkill = async (req, res) => {
    const skill = new Skill(req.body);
    try {
        const newSkill = await skill.save();
        res.status(201).json(newSkill);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a skill
// @route   PUT /api/skills/:id
exports.updateSkill = async (req, res) => {
    try {
        const skill = await Skill.findById(req.params.id);
        if (!skill) return res.status(404).json({ message: "Skill not found" });

        Object.assign(skill, req.body);
        const updatedSkill = await skill.save();
        res.json(updatedSkill);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a skill
// @route   DELETE /api/skills/:id
exports.deleteSkill = async (req, res) => {
    try {
        const skill = await Skill.findById(req.params.id);
        if (!skill) return res.status(404).json({ message: "Skill not found" });

        await skill.deleteOne();
        res.json({ message: "Skill removed" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
