import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AboutManager = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        role: '',
        bio: '',
        profileUrl: '',
        resumeUrl: '',
        email: '',
        phone: ''
    });
    const [message, setMessage] = useState('');
    const API_URL = process.env.REACT_APP_API_URL || 'https://nikhitha-portfolio-app.onrender.com';

    useEffect(() => {
        const fetchAbout = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/about`);
                if (res.data) {
                    // Merge with defaults to avoid nulls
                    setFormData({
                        fullName: res.data.fullName || '',
                        role: res.data.role || '',
                        bio: res.data.bio || '',
                        profileUrl: res.data.profileUrl || '',
                        resumeUrl: res.data.resumeUrl || '',
                        email: res.data.email || '',
                        phone: res.data.phone || ''
                    });
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchAbout();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { 'x-auth-token': localStorage.getItem('token') } };
            await axios.post(`${API_URL}/api/about`, formData, config);
            setMessage('About Info Updated Successfully');
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            console.error(err);
            setMessage('Error updating info');
        }
    };

    return (
        <div className="manager-container animate-fade-in">
            <h2 className="mb-4 text-gradient">Manage About Info</h2>
            {message && <div className="glass-card p-3 mb-3 text-success text-center">{message}</div>}

            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-lg-8">
                        <div className="glass-card p-4 mb-4">
                            <h4 className="text-muted mb-4">Personal Details</h4>
                            <div className="row">
                                <div className="col-md-6 form-group mb-3">
                                    <label className="text-muted mb-2 small text-uppercase">Full Name</label>
                                    <input className="login-input" type="text" name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="e.g. John Doe" />
                                </div>
                                <div className="col-md-6 form-group mb-3">
                                    <label className="text-muted mb-2 small text-uppercase">Current Role</label>
                                    <input className="login-input" type="text" name="role" value={formData.role} onChange={handleChange} required placeholder="e.g. Full Stack Developer" />
                                </div>
                            </div>
                            <div className="form-group mb-3">
                                <label className="text-muted mb-2 small text-uppercase">Bio / Introduction</label>
                                <textarea className="login-input" name="bio" value={formData.bio} onChange={handleChange} rows="6" required placeholder="Tell your story..." />
                            </div>
                        </div>

                        <div className="glass-card p-4 mb-4">
                            <h4 className="text-muted mb-4">Resources</h4>
                            <div className="form-group mb-3">
                                <label className="text-muted mb-2 small text-uppercase">Profile Image URL</label>
                                <input className="login-input" type="text" name="profileUrl" value={formData.profileUrl} onChange={handleChange} placeholder="https://..." />
                            </div>
                            <div className="form-group mb-3">
                                <label className="text-muted mb-2 small text-uppercase">Resume / CV URL</label>
                                <input className="login-input" type="text" name="resumeUrl" value={formData.resumeUrl} onChange={handleChange} placeholder="https://..." />
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="glass-card p-4 mb-4 position-sticky" style={{ top: '2rem' }}>
                            <h4 className="text-muted mb-4">Contact Info</h4>
                            <div className="form-group mb-3">
                                <label className="text-muted mb-2 small text-uppercase">Email Address</label>
                                <input className="login-input" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" />
                            </div>
                            <div className="form-group mb-4">
                                <label className="text-muted mb-2 small text-uppercase">Phone Number</label>
                                <input className="login-input" type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 234 567 890" />
                            </div>

                            <hr className="border-secondary my-4" />

                            <button type="submit" className="login-btn w-100">
                                <i className="bi bi-save me-2"></i> Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AboutManager;
