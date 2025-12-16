const express = require("express");
const router = express.Router();
const { getProjects, createProject, updateProject, deleteProject } = require("../controllers/projectController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", getProjects); // Public
router.post("/", protect, createProject); // Admin only
router.put("/:id", protect, updateProject); // Admin only
router.delete("/:id", protect, deleteProject); // Admin only

module.exports = router;
