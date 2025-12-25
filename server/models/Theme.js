const mongoose = require('mongoose');

const ThemeSchema = new mongoose.Schema({
    primary: { type: String, default: '#6366f1' },
    secondary: { type: String, default: '#ec4899' },
    accent: { type: String, default: '#8b5cf6' },
    bgDark: { type: String, default: '#0f172a' },
    textMain: { type: String, default: '#f8fafc' }
}, { timestamps: true });

// Prevent multiple theme documents
ThemeSchema.pre('save', async function (next) {
    const count = await this.constructor.countDocuments();
    if (count > 0 && this.isNew) {
        const err = new Error('Only one theme document is allowed.');
        next(err);
    } else {
        next();
    }
});

module.exports = mongoose.model('Theme', ThemeSchema);
