import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SkillManager = () => {
    const [skills, setSkills] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        level: 50,
        category: ''
    });
    const [editingId, setEditingId] = useState(null);
    const [message, setMessage] = useState('');

    const API_URL = process.env.REACT_APP_API_URL || 'https://nikhitha-portfolio-app.onrender.com';

    const fetchSkills = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/skills`);
            setSkills(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchSkills();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { 'x-auth-token': localStorage.getItem('token') } };

            if (editingId) {
                await axios.put(`${API_URL}/api/skills/${editingId}`, formData, config);
                setMessage('Skill Updated');
            } else {
                await axios.post(`${API_URL}/api/skills`, formData, config);
                setMessage('Skill Added');
            }

            setFormData({ name: '', level: 50, category: '' });
            setEditingId(null);
            fetchSkills();
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            console.error(err);
            setMessage('Error saving skill');
        }
    };

    const handleEdit = (skill) => {
        setEditingId(skill._id);
        setFormData({ name: skill.name, level: skill.level, category: skill.category });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this skill?')) {
            try {
                const config = { headers: { 'x-auth-token': localStorage.getItem('token') } };
                await axios.delete(`${API_URL}/api/skills/${id}`, config);
                fetchSkills();
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <div className="manager-container animate-fade-in">
            <h2 className="mb-4 text-gradient">Manage Skills</h2>
            {message && <div className="glass-card p-3 mb-3 text-success text-center">{message}</div>}

            <div className="glass-card p-4 mb-5">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6 form-group mb-3">
                            <label className="text-muted mb-2">Skill Name</label>
                            <input className="login-input" type="text" name="name" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div className="col-md-6 form-group mb-3">
                            <label className="text-muted mb-2">Category (Frontend, etc.)</label>
                            <input className="login-input" type="text" name="category" value={formData.category} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="form-group mb-4">
                        <label className="text-muted mb-2">Proficiency Level (1-100): {formData.level}%</label>
                        <input className="w-100" type="range" name="level" min="1" max="100" value={formData.level} onChange={handleChange} />
                    </div>
                    <button type="submit" className="login-btn">{editingId ? 'Update Skill' : 'Add Skill'}</button>
                    {editingId && <button type="button" onClick={() => { setEditingId(null); setFormData({ name: '', level: 50, category: '' }); }} className="btn-danger mt-3 w-100">Cancel</button>}
                </form>
            </div>

            <div className="item-list">
                {skills.map(skill => (
                    <div key={skill._id} className="glass-card p-4 mb-3 d-flex justify-content-between align-items-center">
                        <div className="w-100 me-4">
                            <h4 className="mb-1">{skill.name} <span className="text-muted fs-6">({skill.category})</span></h4>
                            <div style={{ background: 'rgba(255,255,255,0.1)', width: '100%', height: '8px', borderRadius: '4px', marginTop: '10px' }}>
                                <div style={{
                                    background: 'var(--gradient-main)',
                                    width: `${skill.level}%`,
                                    height: '100%',
                                    borderRadius: '4px',
                                    transition: 'width 1s ease'
                                }}></div>
                            </div>
                        </div>
                        <div className="d-flex gap-2" style={{ minWidth: '140px' }}>
                            <button onClick={() => handleEdit(skill)} className="btn-edit">Edit</button>
                            <button onClick={() => handleDelete(skill._id)} className="btn-danger">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SkillManager;
