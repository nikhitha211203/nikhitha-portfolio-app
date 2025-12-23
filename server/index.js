const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const cors = require("cors");

app.use(cors({
  origin: "https://nikhitha-portfolio-app.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));


app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
