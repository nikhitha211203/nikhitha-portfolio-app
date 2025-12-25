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

            <div className="row">
                <div className="col-lg-5 mb-4">
                    <div className="glass-card p-4 h-100">
                        <h4 className="text-muted mb-4">{editingId ? 'Edit Skill' : 'Add New Skill'}</h4>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-3">
                                <label className="text-muted mb-2 text-uppercase small">Skill Name</label>
                                <input className="login-input" type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. React.js" required />
                            </div>
                            <div className="form-group mb-3">
                                <label className="text-muted mb-2 text-uppercase small">Category</label>
                                <select className="login-input" name="category" value={formData.category} onChange={handleChange} required style={{ cursor: 'pointer' }}>
                                    <option value="" disabled className="text-dark">Select Category</option>
                                    <option value="Frontend" className="text-dark">Frontend</option>
                                    <option value="Backend" className="text-dark">Backend</option>
                                    <option value="Tools" className="text-dark">Tools & DevOps</option>
                                    <option value="Design" className="text-dark">Design</option>
                                    <option value="Soft Skills" className="text-dark">Soft Skills</option>
                                </select>
                            </div>
                            <div className="form-group mb-5">
                                <div className="d-flex justify-content-between mb-2">
                                    <label className="text-muted text-uppercase small">Proficiency</label>
                                    <span className="text-primary fw-bold">{formData.level}%</span>
                                </div>
                                <input
                                    className="w-100 form-range custom-range"
                                    type="range"
                                    name="level"
                                    min="1"
                                    max="100"
                                    value={formData.level}
                                    onChange={handleChange}
                                    style={{ accentColor: 'var(--primary)' }}
                                />
                            </div>
                            <button type="submit" className="login-btn">
                                <i className={`bi ${editingId ? 'bi-check-lg' : 'bi-plus-lg'} me-2`}></i>
                                {editingId ? 'Update Skill' : 'Add Skill'}
                            </button>
                            {editingId && (
                                <button type="button" onClick={() => { setEditingId(null); setFormData({ name: '', level: 50, category: '' }); }} className="btn btn-sm btn-outline-danger w-100 mt-3 border-0">
                                    Cancel
                                </button>
                            )}
                        </form>
                    </div>
                </div>

                <div className="col-lg-7">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4 className="text-muted m-0">Skill Inventory</h4>
                        <span className="badge bg-secondary opacity-50">{skills.length} Items</span>
                    </div>

                    <div className="item-list" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                        {skills.map(skill => (
                            <div key={skill._id} className="glass-card p-3 mb-3 d-flex align-items-center" style={{ borderLeft: `4px solid ${skill.level > 80 ? '#22c55e' : skill.level > 50 ? '#f59e0b' : '#ef4444'}` }}>
                                <div className="flex-grow-1 me-3">
                                    <div className="d-flex justify-content-between align-items-center mb-1">
                                        <h5 className="mb-0 text-white">{skill.name}</h5>
                                        <span className="badge bg-dark border border-secondary">{skill.category}</span>
                                    </div>
                                    <div className="progress" style={{ height: '6px', background: 'rgba(255,255,255,0.1)' }}>
                                        <div
                                            className="progress-bar"
                                            role="progressbar"
                                            style={{
                                                width: `${skill.level}%`,
                                                background: 'var(--gradient-main)',
                                                borderRadius: '10px'
                                            }}
                                        ></div>
                                    </div>
                                </div>
                                <div className="d-flex gap-2">
                                    <button onClick={() => handleEdit(skill)} className="btn btn-sm btn-outline-warning border-0" title="Edit"><i className="bi bi-pencil"></i></button>
                                    <button onClick={() => handleDelete(skill._id)} className="btn btn-sm btn-outline-danger border-0" title="Delete"><i className="bi bi-trash"></i></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkillManager;
