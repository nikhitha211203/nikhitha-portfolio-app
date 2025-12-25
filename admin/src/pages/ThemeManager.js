import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ThemeManager = () => {
    const [theme, setTheme] = useState({
        primary: '#6366f1',
        secondary: '#ec4899',
        accent: '#8b5cf6',
        bgDark: '#0f172a',
        textMain: '#f8fafc'
    });
    const [message, setMessage] = useState('');

    // Correct API URL logic for local development
    const API_URL = window.location.hostname === 'localhost'
        ? 'http://localhost:5000'
        : (process.env.REACT_APP_API_URL || 'https://nikhitha-portfolio-app.onrender.com');

    useEffect(() => {
        const fetchTheme = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/theme`);
                if (res.data && res.data.primary) { // Ensure data exists
                    setTheme({
                        primary: res.data.primary,
                        secondary: res.data.secondary,
                        accent: res.data.accent,
                        bgDark: res.data.bgDark,
                        textMain: res.data.textMain
                    });
                }
            } catch (err) {
                console.error('Error fetching theme:', err);
            }
        };
        fetchTheme();
    }, [API_URL]);

    const presets = [
        { name: 'Midnight (Default)', primary: '#6366f1', secondary: '#ec4899', accent: '#8b5cf6', bgDark: '#0f172a', textMain: '#f8fafc' },
        { name: 'Ocean Blue', primary: '#0ea5e9', secondary: '#3b82f6', accent: '#06b6d4', bgDark: '#020617', textMain: '#f1f5f9' },
        { name: 'Sunset', primary: '#f59e0b', secondary: '#ef4444', accent: '#d946ef', bgDark: '#1c1917', textMain: '#fafaf9' },
        { name: 'Forest', primary: '#22c55e', secondary: '#10b981', accent: '#84cc16', bgDark: '#052e16', textMain: '#f0fdf4' },
        { name: 'Cyberpunk', primary: '#fct203', secondary: '#ff003c', accent: '#00f3ff', bgDark: '#000000', textMain: '#fff01f' },
        { name: 'Royal', primary: '#8b5cf6', secondary: '#d946ef', accent: '#6366f1', bgDark: '#1e1b4b', textMain: '#f5f3ff' }
    ];

    const applyPreset = (preset) => {
        setTheme({
            primary: preset.primary,
            secondary: preset.secondary,
            accent: preset.accent,
            bgDark: preset.bgDark,
            textMain: preset.textMain
        });
    };

    const handleChange = (e) => {
        setTheme({ ...theme, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { 'x-auth-token': token } };
            await axios.put(`${API_URL}/api/theme`, theme, config);
            setMessage('Theme Updated Successfully!');
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            console.error(err);
            setMessage('Error updating theme');
        }
    };

    // Preview Style
    const previewStyle = {
        background: theme.bgDark,
        color: theme.textMain,
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid rgba(255,255,255,0.1)',
        marginTop: '20px'
    };

    return (
        <div className="manager-container animate-fade-in">
            <h2 className="mb-4 text-gradient">Customize Theme</h2>
            {message && <div className="glass-card p-3 mb-3 text-success text-center">{message}</div>}

            <div className="row">
                <div className="col-lg-6">
                    <div className="glass-card p-4 mb-4">
                        <h4 className="text-muted mb-3">Presets</h4>
                        <div className="d-flex flex-wrap gap-2 mb-4">
                            {presets.map((p, i) => (
                                <button
                                    key={i}
                                    className="btn btn-outline-light btn-sm"
                                    onClick={() => applyPreset(p)}
                                    style={{ border: `1px solid ${p.primary}`, color: p.primary }}
                                >
                                    {p.name}
                                </button>
                            ))}
                        </div>

                        <h4 className="text-muted mb-3">Custom Colors</h4>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-3">
                                <label className="text-muted mb-2">Primary Color</label>
                                <div className="d-flex align-items-center gap-3">
                                    <input type="color" name="primary" value={theme.primary} onChange={handleChange} style={{ width: '50px', height: '50px', padding: '0', border: 'none', background: 'none' }} />
                                    <input className="login-input" type="text" name="primary" value={theme.primary} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="form-group mb-3">
                                <label className="text-muted mb-2">Secondary Color</label>
                                <div className="d-flex align-items-center gap-3">
                                    <input type="color" name="secondary" value={theme.secondary} onChange={handleChange} style={{ width: '50px', height: '50px', padding: '0', border: 'none', background: 'none' }} />
                                    <input className="login-input" type="text" name="secondary" value={theme.secondary} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="form-group mb-3">
                                <label className="text-muted mb-2">Accent Color</label>
                                <div className="d-flex align-items-center gap-3">
                                    <input type="color" name="accent" value={theme.accent} onChange={handleChange} style={{ width: '50px', height: '50px', padding: '0', border: 'none', background: 'none' }} />
                                    <input className="login-input" type="text" name="accent" value={theme.accent} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="form-group mb-3">
                                <label className="text-muted mb-2">Background Dark</label>
                                <div className="d-flex align-items-center gap-3">
                                    <input type="color" name="bgDark" value={theme.bgDark} onChange={handleChange} style={{ width: '50px', height: '50px', padding: '0', border: 'none', background: 'none' }} />
                                    <input className="login-input" type="text" name="bgDark" value={theme.bgDark} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="form-group mb-4">
                                <label className="text-muted mb-2">Text Main</label>
                                <div className="d-flex align-items-center gap-3">
                                    <input type="color" name="textMain" value={theme.textMain} onChange={handleChange} style={{ width: '50px', height: '50px', padding: '0', border: 'none', background: 'none' }} />
                                    <input className="login-input" type="text" name="textMain" value={theme.textMain} onChange={handleChange} />
                                </div>
                            </div>

                            <button type="submit" className="login-btn">Save Theme</button>
                        </form>
                    </div>
                </div>

                <div className="col-lg-6">
                    <h4 className="text-muted mb-3">Live Preview</h4>
                    <div style={previewStyle}>
                        <h3 style={{ color: theme.primary }}>Primary Heading</h3>
                        <h4 style={{ color: theme.secondary }}>Secondary Subheading</h4>
                        <p>This is how your text will look on the background.</p>
                        <button style={{
                            background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.accent} 50%, ${theme.secondary} 100%)`,
                            color: 'white',
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '8px',
                            fontWeight: 'bold'
                        }}>
                            Gradient Button
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThemeManager;
