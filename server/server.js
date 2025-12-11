const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

// Debugging Environment
console.log("--- Server Environment Check ---");
console.log("PORT:", process.env.PORT);
console.log("MONGO_URI is set:", !!process.env.MONGO_URI);
console.log("JWT_SECRET is set:", !!process.env.JWT_SECRET);
if (process.env.JWT_SECRET) console.log("JWT_SECRET length:", process.env.JWT_SECRET.length);
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("--------------------------------");

if (!process.env.JWT_SECRET) {
  console.error("FATAL ERROR: JWT_SECRET is missing! Authentication will fail.");
}

const Contact = require("./models/Contact");

process.on('uncaughtException', (err) => {
  console.error("UNCAUGHT EXCEPTION:", err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error("UNHANDLED REJECTION:", reason);
  process.exit(1);
});

const app = express();

app.use(cors({
  origin: ["http://localhost:3000", "https://nikhitha-admin.vercel.app"],
  credentials: true
}));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../client/build")));
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


// Test route removed to allow React app serving

// ===============================
//  Start Server
// ===============================
// Use Render PORT or local 5000
// ===============================
//  Catch-All Route for React
// ===============================
app.get(/(.*)/, (req, res) => {
  const filePath = path.join(__dirname, "../client/build/index.html");
  console.log("Serving React App from:", filePath);
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error("Error serving static file:", err);
      res.status(500).send(err);
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
