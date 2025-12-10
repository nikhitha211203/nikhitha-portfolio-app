const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const auth = require("../middleware/authMiddleware");

// @route   POST api/contact
// @desc    Submit a message
// @access  Public
router.post("/", async (req, res) => {
    try {
        const contactData = new Contact(req.body);
        await contactData.save();

        res.status(200).json({
            success: true,
            message: "Message Saved Successfully!",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error saving message!",
            error: error.message,
        });
    }
});

// @route   GET api/contact
// @desc    Get all messages
// @access  Private
router.get("/", auth, async (req, res) => {
    try {
        const messages = await Contact.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

// @route   DELETE api/contact/:id
// @desc    Delete a message
// @access  Private
router.delete("/:id", auth, async (req, res) => {
    try {
        await Contact.findByIdAndDelete(req.params.id);
        res.json({ msg: "Message removed" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

// @route   PUT api/contact/:id
// @desc    Mark as read
// @access  Private
router.put("/:id", auth, async (req, res) => {
    try {
        const message = await Contact.findByIdAndUpdate(
            req.params.id,
            { isRead: true },
            { new: true }
        );
        res.json(message);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
