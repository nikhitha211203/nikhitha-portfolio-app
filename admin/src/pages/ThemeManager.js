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
                        <h4 className="text-muted mb-3">Quick Presets</h4>
                        <div className="d-grid gap-2 mb-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))' }}>
                            {presets.map((p, i) => (
                                <button
                                    key={i}
                                    className="btn btn-sm text-start p-2 position-relative overflow-hidden"
                                    onClick={() => applyPreset(p)}
                                    style={{
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        background: 'rgba(255,255,255,0.05)',
                                        color: 'white'
                                    }}
                                >
                                    <div className="d-flex align-items-center gap-2">
                                        <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: `linear-gradient(135deg, ${p.primary}, ${p.secondary})` }}></div>
                                        <span>{p.name.split(' ')[0]}</span>
                                    </div>
                                </button>
                            ))}
                        </div>

                        <h4 className="text-muted mb-3">Fine Tune Colors</h4>
                        <form onSubmit={handleSubmit}>
                            {[
                                { label: 'Primary', name: 'primary' },
                                { label: 'Secondary', name: 'secondary' },
                                { label: 'Accent', name: 'accent' },
                                { label: 'Background', name: 'bgDark' },
                                { label: 'Text', name: 'textMain' }
                            ].map((field) => (
                                <div className="form-group mb-3" key={field.name}>
                                    <label className="text-muted mb-1 text-uppercase small" style={{ letterSpacing: '1px' }}>{field.label}</label>
                                    <div className="input-group">
                                        <div className="input-group-text p-0 border-0" style={{ width: '40px', overflow: 'hidden', background: 'none' }}>
                                            <input
                                                type="color"
                                                name={field.name}
                                                value={theme[field.name]}
                                                onChange={handleChange}
                                                style={{ width: '150%', height: '150%', transform: 'translate(-25%, -25%)', cursor: 'pointer', border: 'none', padding: 0 }}
                                            />
                                        </div>
                                        <input
                                            className="form-control bg-transparent text-white border-secondary"
                                            type="text"
                                            name={field.name}
                                            value={theme[field.name]}
                                            onChange={handleChange}
                                            style={{ borderLeft: 'none' }}
                                        />
                                    </div>
                                </div>
                            ))}

                            <button type="submit" className="login-btn mt-3">
                                <i className="bi bi-check-circle me-2"></i> Save Changes
                            </button>
                        </form>
                    </div>
                </div>

                <div className="col-lg-6">
                    <h4 className="text-muted mb-3">Live Preview</h4>
                    <div style={previewStyle} className="glass-card">
                        <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                            <span style={{ color: theme.primary, fontWeight: 'bold' }}>Brand Logo</span>
                            <div className="d-flex gap-3">
                                <span className="text-muted" style={{ fontSize: '0.9rem' }}>Home</span>
                                <span className="text-muted" style={{ fontSize: '0.9rem' }}>About</span>
                            </div>
                        </div>

                        <h3 style={{ color: theme.primary }} className="mb-2">Limitless Possibilities</h3>
                        <h5 style={{ color: theme.secondary }} className="mb-3">Design your future</h5>
                        <p style={{ color: theme.textMain, opacity: 0.8 }} className="mb-4">
                            This is a preview of how your typography and colors will interact.
                            The <span style={{ color: theme.accent }}>accent color</span> highlights key details.
                        </p>

                        <div className="d-flex gap-3">
                            <button style={{
                                background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`,
                                color: 'white',
                                padding: '10px 24px',
                                border: 'none',
                                borderRadius: '8px',
                                fontWeight: '600',
                                boxShadow: `0 4px 15px ${theme.primary}40`
                            }}>
                                Primary Action
                            </button>
                            <button style={{
                                background: 'transparent',
                                color: theme.textMain,
                                padding: '10px 24px',
                                border: `1px solid ${theme.accent}`,
                                borderRadius: '8px',
                                fontWeight: '600'
                            }}>
                                Secondary
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThemeManager;
