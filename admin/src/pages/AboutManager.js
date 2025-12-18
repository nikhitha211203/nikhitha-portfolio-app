import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const AboutManager = ({ setToken }) => {
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
        <div>
            <Navbar setToken={setToken} />
            <div className="manager-container">
                <h2>Manage About Info</h2>
                {message && <p>{message}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group"><label>Full Name</label><input type="text" name="fullName" value={formData.fullName} onChange={handleChange} /></div>
                    <div className="form-group"><label>Current Role</label><input type="text" name="role" value={formData.role} onChange={handleChange} /></div>
                    <div className="form-group"><label>Bio</label><textarea name="bio" value={formData.bio} onChange={handleChange} rows="5" /></div>
                    <div className="form-group"><label>Profile Image URL</label><input type="text" name="profileUrl" value={formData.profileUrl} onChange={handleChange} /></div>
                    <div className="form-group"><label>Resume URL</label><input type="text" name="resumeUrl" value={formData.resumeUrl} onChange={handleChange} /></div>
                    <div className="form-group"><label>Email</label><input type="email" name="email" value={formData.email} onChange={handleChange} /></div>
                    <div className="form-group"><label>Phone</label><input type="text" name="phone" value={formData.phone} onChange={handleChange} /></div>

                    <button type="submit" className="btn-primary">Save Changes</button>
                </form>
            </div>
        </div>
    );
};

export default AboutManager;
