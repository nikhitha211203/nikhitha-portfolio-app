const mongoose = require('mongoose');

const ThemeSchema = new mongoose.Schema({
    primary: { type: String, default: '#6366f1' },
    secondary: { type: String, default: '#ec4899' },
    accent: { type: String, default: '#8b5cf6' },
    bgDark: { type: String, default: '#0f172a' },
    textMain: { type: String, default: '#f8fafc' }
}, { timestamps: true });

// Prevent multiple theme documents
ThemeSchema.pre('save', async function () {
    const count = await this.constructor.countDocuments();
    if (count > 0 && this.isNew) {
        throw new Error('Only one theme document is allowed.');
    }
});

module.exports = mongoose.model('Theme', ThemeSchema);
