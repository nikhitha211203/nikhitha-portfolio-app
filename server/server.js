const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Contact = require("./models/Contact");

const app = express();
app.use(cors());
// ===============================
//  Middleware
// ===============================
app.use(express.json());
app.use(require('cookie-parser')());

// ===============================
//  Routes
// ===============================
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/skills', require('./routes/skillRoutes'));
app.use('/api/about', require('./routes/aboutRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));

// ===============================
//  MongoDB Connectcd
// ===============================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully!"))
  .catch((err) => console.log("MongoDB Error:", err));


// ===============================
//  Test Route (GET)
// ===============================
app.get("/", (req, res) => {
  res.send("Portfolio Server Running ✔");
});

// ===============================
//  Start Server
// ===============================
// Use Render PORT or local 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
