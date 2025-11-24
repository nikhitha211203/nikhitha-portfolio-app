const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Contact = require("./models/Contact");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connect
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected Successfully!"))
.catch(err => console.log("MongoDB Error:", err));

// Contact API Route
app.post("/contact", async (req, res) => {
  try {
    const contactData = new Contact(req.body);
    await contactData.save();
    res.json({ success: true, message: "Message Saved Successfully!" });
  } catch (error) {
    res.json({ success: false, message: "Error saving message!" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
