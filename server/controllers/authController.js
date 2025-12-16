const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// @desc    Register Admin (One-time use or protected)
// @route   POST /api/admin/register
exports.registerAdmin = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await Admin.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "Admin already exists" });
        }

        const admin = await Admin.create({ name, email, password });

        if (admin) {
            res.status(201).json({
                _id: admin._id,
                name: admin.name,
                email: admin.email,
                token: generateToken(admin._id),
            });
        } else {
            res.status(400).json({ message: "Invalid admin data" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Login Admin
// @route   POST /api/admin/login
exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });

        if (admin && (await bcrypt.compare(password, admin.password))) {
            res.json({
                _id: admin._id,
                name: admin.name,
                email: admin.email,
                token: generateToken(admin._id),
            });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get Admin Profile
// @route   GET /api/admin/me
exports.getMe = async (req, res) => {
    // Middleware will attach user to req
    res.status(200).json(req.user);
};
