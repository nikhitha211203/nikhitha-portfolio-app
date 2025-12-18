const express = require("express");
const router = express.Router();
const { getExperiences, createExperience, deleteExperience, getEducation, createEducation, deleteEducation } = require("../controllers/experienceController");
const protect = require("../middleware/authMiddleware");

// Experience
router.get("/experience", getExperiences);
router.post("/experience", protect, createExperience);
router.delete("/experience/:id", protect, deleteExperience);

// Education
router.get("/education", getEducation);
router.post("/education", protect, createEducation);
router.delete("/education/:id", protect, deleteEducation);

module.exports = router;
