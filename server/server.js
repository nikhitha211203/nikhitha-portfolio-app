const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
require("dotenv").config({ path: path.join(__dirname, ".env") });

// ===============================
//  Debugging Environment
// ===============================
console.log("--- Server Environment Check ---");
console.log("PORT:", process.env.PORT);
console.log("MONGO_URI is set:", !!process.env.MONGO_URI);
console.log("JWT_SECRET is set:", !!process.env.JWT_SECRET);
if (process.env.JWT_SECRET) {
  console.log("JWT_SECRET length:", process.env.JWT_SECRET.length);
}
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("--------------------------------");

if (!process.env.JWT_SECRET) {
  console.error("FATAL ERROR: JWT_SECRET is missing!");
}

// ===============================
//  App Init
// ===============================
const app = express();

// ===============================
//  Global Error Handlers
// ===============================
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION:", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.error("UNHANDLED REJECTION:", reason);
  process.exit(1);
});

// ===============================
//  Middleware
// ===============================
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:3002",
      "https://nikhitha-admin.vercel.app",
      "https://portfolio-nikhitha-kappa.vercel.app",
      "https://nikhitha-portfolio-app.vercel.app"

    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// ===============================
//  API Routes
// ===============================
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/skills", require("./routes/skillRoutes"));
app.use("/api/about", require("./routes/aboutRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/experience", require("./routes/experienceRoutes"));
app.use("/api/theme", require("./routes/themeRoutes"));

// ===============================
//  MongoDB Connection
// ===============================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully!"))
  .catch((err) => console.error("MongoDB Error:", err));

// ===============================
//  Root Route (Health Check)
// ===============================
app.get("/", (req, res) => {
  res.send("API is running successfully!");
});

// ===============================
//  Test Route
// ===============================
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is connected!" });
});

// ===============================
//  Start Server
// ===============================
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
