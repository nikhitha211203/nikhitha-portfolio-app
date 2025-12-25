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
                if (res.data && res.data.primary) {
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
        padding: '2rem',
        borderRadius: '16px',
        border: '1px solid rgba(255,255,255,0.05)',
        marginTop: '0'
    };

    return (
        <div className="manager-container animate-fade-in">
            <h2 className="mb-4 text-gradient">Customize Theme</h2>
            {message && <div className="glass-card p-3 mb-3 text-success text-center">{message}</div>}

            <div className="row">
                <div className="col-lg-7">
                    <div className="glass-card p-4 mb-4">
                        <h4 className="text-muted mb-4">Quick Presets</h4>
                        <div className="d-grid gap-3 mb-5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))' }}>
                            {presets.map((p, i) => (
                                <button
                                    key={i}
                                    className="btn text-start p-3 position-relative overflow-hidden transition-all"
                                    onClick={() => applyPreset(p)}
                                    style={{
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        background: 'rgba(255,255,255,0.03)',
                                        color: 'white',
                                        borderRadius: '12px'
                                    }}
                                >
                                    <div className="d-flex align-items-center gap-3">
                                        <div style={{
                                            width: '24px',
                                            height: '24px',
                                            borderRadius: '50%',
                                            background: `linear-gradient(135deg, ${p.primary}, ${p.secondary})`,
                                            boxShadow: `0 0 10px ${p.primary}40`
                                        }}></div>
                                        <span style={{ fontWeight: 500 }}>{p.name.split(' ')[0]}</span>
                                    </div>
                                </button>
                            ))}
                        </div>

                        <h4 className="text-muted mb-4">Fine Tune Colors</h4>
                        <form onSubmit={handleSubmit}>
                            <div className="row g-3">
                                {[
                                    { label: 'Primary', name: 'primary' },
                                    { label: 'Secondary', name: 'secondary' },
                                    { label: 'Accent', name: 'accent' },
                                    { label: 'Background', name: 'bgDark' },
                                    { label: 'Text', name: 'textMain' }
                                ].map((field) => (
                                    <div className="col-md-6" key={field.name}>
                                        <div className="p-3 rounded-3" style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)' }}>
                                            <label className="text-muted mb-2 text-uppercase small d-block" style={{ letterSpacing: '1px', fontSize: '0.7rem' }}>{field.label}</label>
                                            <div className="d-flex align-items-center gap-3">
                                                <div style={{
                                                    width: '40px',
                                                    height: '40px',
                                                    borderRadius: '8px',
                                                    overflow: 'hidden',
                                                    border: '2px solid rgba(255,255,255,0.1)',
                                                    position: 'relative'
                                                }}>
                                                    <input
                                                        type="color"
                                                        name={field.name}
                                                        value={theme[field.name]}
                                                        onChange={handleChange}
                                                        style={{
                                                            padding: 0,
                                                            width: '150%',
                                                            height: '150%',
                                                            transform: 'translate(-25%, -25%)',
                                                            cursor: 'pointer',
                                                            border: 'none',
                                                            background: 'none'
                                                        }}
                                                    />
                                                </div>
                                                <input
                                                    type="text"
                                                    name={field.name}
                                                    value={theme[field.name]}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    style={{
                                                        background: 'transparent',
                                                        border: 'none',
                                                        color: 'white',
                                                        fontFamily: 'monospace',
                                                        fontSize: '1rem',
                                                        boxShadow: 'none',
                                                        padding: 0
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4 pt-3 border-top" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                                <button type="submit" className="login-btn w-auto px-5" style={{ float: 'right' }}>
                                    <i className="bi bi-check-lg me-2"></i> Save Theme
                                </button>
                                <div style={{ clear: 'both' }}></div>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="col-lg-5">
                    <div className="position-sticky" style={{ top: '2rem' }}>
                        <h4 className="text-muted mb-3">Live Preview</h4>
                        <div style={previewStyle} className="glass-card shadow-lg">
                            <div className="d-flex justify-content-between align-items-center mb-5 pb-3" style={{ borderBottom: `1px solid ${theme.primary}30` }}>
                                <span style={{ color: theme.primary, fontWeight: '800', fontSize: '1.2rem', letterSpacing: '-0.5px' }}>Portfolio.</span>
                                <div className="d-flex gap-4">
                                    <span style={{ color: theme.textMain, opacity: 0.7, fontSize: '0.9rem' }}>Work</span>
                                    <span style={{ color: theme.textMain, opacity: 0.7, fontSize: '0.9rem' }}>About</span>
                                </div>
                            </div>

                            <h3 style={{ color: theme.textMain, fontSize: '2rem', fontWeight: 'bold' }} className="mb-2">
                                Create <span style={{ color: theme.primary }}>Digital</span> Experiences
                            </h3>
                            <p style={{ color: theme.textMain, opacity: 0.6, lineHeight: '1.6' }} className="mb-5">
                                This is exactly how your <span style={{ color: theme.secondary, fontWeight: 'bold' }}>colors</span> will appear on your real portfolio website.
                            </p>

                            <div className="d-flex gap-3">
                                <button style={{
                                    background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`,
                                    color: 'white',
                                    padding: '12px 28px',
                                    border: 'none',
                                    borderRadius: '12px',
                                    fontWeight: '600',
                                    boxShadow: `0 10px 20px -5px ${theme.primary}60`
                                }}>
                                    Hire Me
                                </button>
                                <button style={{
                                    background: 'rgba(255,255,255,0.05)',
                                    color: theme.textMain,
                                    padding: '12px 28px',
                                    border: `1px solid ${theme.accent}60`,
                                    borderRadius: '12px',
                                    fontWeight: '600'
                                }}>
                                    View Work
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThemeManager;
