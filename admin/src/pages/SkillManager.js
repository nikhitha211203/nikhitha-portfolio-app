import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const SkillManager = ({ setToken }) => {
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
        <div>
            <Navbar setToken={setToken} />
            <div className="manager-container">
                <h2>Manage Skills</h2>
                {message && <p>{message}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Skill Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Category (Frontend, Backend, etc.)</label>
                        <input type="text" name="category" value={formData.category} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Proficiency Level (1-100): {formData.level}%</label>
                        <input type="range" name="level" min="1" max="100" value={formData.level} onChange={handleChange} />
                    </div>
                    <button type="submit" className="btn-primary">{editingId ? 'Update' : 'Add'}</button>
                    {editingId && <button type="button" onClick={() => { setEditingId(null); setFormData({ name: '', level: 50, category: '' }); }} className="btn-danger">Cancel</button>}
                </form>

                <div className="item-list">
                    {skills.map(skill => (
                        <div key={skill._id} className="item-card">
                            <div>
                                <h4>{skill.name} ({skill.category})</h4>
                                <div style={{ background: '#eee', width: '200px', height: '10px', borderRadius: '5px' }}>
                                    <div style={{ background: 'green', width: `${skill.level}%`, height: '100%', borderRadius: '5px' }}></div>
                                </div>
                            </div>
                            <div>
                                <button onClick={() => handleEdit(skill)} className="btn-edit">Edit</button>
                                <button onClick={() => handleDelete(skill._id)} className="btn-danger">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SkillManager;
