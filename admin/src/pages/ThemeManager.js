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
    const API_URL = process.env.REACT_APP_API_URL || 'https://nikhitha-portfolio-app.onrender.com';

    useEffect(() => {
        const fetchTheme = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/theme`);
                if (res.data) {
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
    }, []);

    const handleChange = (e) => {
        setTheme({ ...theme, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { 'x-auth-token': localStorage.getItem('token') } };
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
