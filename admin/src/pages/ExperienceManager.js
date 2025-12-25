import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExperienceManager = () => {
    const [experiences, setExperiences] = useState([]);
    const [education, setEducation] = useState([]);
    const [editingExpId, setEditingExpId] = useState(null);
    const [editingEduId, setEditingEduId] = useState(null);

    // Experience Form
    const [expForm, setExpForm] = useState({
        jobTitle: '',
        company: '',
        duration: '',
        description: ''
    });

    // Education Form
    const [eduForm, setEduForm] = useState({
        school: '',
        degree: '',
        duration: '',
        description: ''
    });

    const [message, setMessage] = useState('');
    const API_URL = process.env.REACT_APP_API_URL || 'https://nikhitha-portfolio-app.onrender.com';

    const fetchData = async () => {
        try {
            const expRes = await axios.get(`${API_URL}/api/experience`);
            setExperiences(expRes.data);
            const eduRes = await axios.get(`${API_URL}/api/education`);
            setEducation(eduRes.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // --- Experience Handlers ---
    const handleExpChange = (e) => setExpForm({ ...expForm, [e.target.name]: e.target.value });

    const handleExpSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { 'x-auth-token': localStorage.getItem('token') } };
            if (editingExpId) {
                await axios.put(`${API_URL}/api/experience/${editingExpId}`, expForm, config);
                setMessage('Experience Updated');
                setEditingExpId(null);
            } else {
                await axios.post(`${API_URL}/api/experience`, expForm, config);
                setMessage('Experience Added');
            }
            setExpForm({ jobTitle: '', company: '', duration: '', description: '' });
            fetchData();
        } catch (err) { setMessage('Error saving experience'); }
    };

    const handleEditExp = (exp) => {
        setEditingExpId(exp._id);
        setExpForm({ jobTitle: exp.jobTitle, company: exp.company, duration: exp.duration, description: exp.description });
    };

    const cancelEditExp = () => {
        setEditingExpId(null);
        setExpForm({ jobTitle: '', company: '', duration: '', description: '' });
    };

    const deleteExp = async (id) => {
        if (window.confirm('Delete?')) {
            try {
                const config = { headers: { 'x-auth-token': localStorage.getItem('token') } };
                await axios.delete(`${API_URL}/api/experience/${id}`, config);
                fetchData();
            } catch (err) { console.error(err); }
        }
    };

    // --- Education Handlers ---
    const handleEduChange = (e) => setEduForm({ ...eduForm, [e.target.name]: e.target.value });

    const handleEduSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { 'x-auth-token': localStorage.getItem('token') } };
            if (editingEduId) {
                await axios.put(`${API_URL}/api/education/${editingEduId}`, eduForm, config);
                setMessage('Education Updated');
                setEditingEduId(null);
            } else {
                await axios.post(`${API_URL}/api/education`, eduForm, config);
                setMessage('Education Added');
            }
            setEduForm({ school: '', degree: '', duration: '', description: '' });
            fetchData();
        } catch (err) { setMessage('Error saving education'); }
    };

    const handleEditEdu = (edu) => {
        setEditingEduId(edu._id);
        setEduForm({ school: edu.school, degree: edu.degree, duration: edu.duration, description: edu.description });
    };

    const cancelEditEdu = () => {
        setEditingEduId(null);
        setEduForm({ school: '', degree: '', duration: '', description: '' });
    };

    const deleteEdu = async (id) => {
        if (window.confirm('Delete?')) {
            try {
                const config = { headers: { 'x-auth-token': localStorage.getItem('token') } };
                await axios.delete(`${API_URL}/api/education/${id}`, config);
                fetchData();
            } catch (err) { console.error(err); }
        }
    };

    return (
        <div className="manager-container animate-fade-in">
            <h2 className="mb-4 text-gradient">Manage Experience & Education</h2>
            {message && <div className="glass-card p-3 mb-3 text-success text-center">{message}</div>}

            {/* Experience Section */}
            <section className="mb-5">
                <h3 className="mb-3 text-light">Experience</h3>
                <div className="glass-card p-4 mb-4">
                    <form onSubmit={handleExpSubmit}>
                        <div className="row">
                            <div className="col-md-6 form-group mb-3"><label className="text-muted mb-2">Job Title</label><input className="login-input" type="text" name="jobTitle" value={expForm.jobTitle} onChange={handleExpChange} required /></div>
                            <div className="col-md-6 form-group mb-3"><label className="text-muted mb-2">Company</label><input className="login-input" type="text" name="company" value={expForm.company} onChange={handleExpChange} required /></div>
                        </div>
                        <div className="form-group mb-3"><label className="text-muted mb-2">Duration</label><input className="login-input" type="text" name="duration" value={expForm.duration} onChange={handleExpChange} placeholder="e.g. Jan 2020 - Present" required /></div>
                        <div className="form-group mb-4"><label className="text-muted mb-2">Description</label><textarea className="login-input" name="description" value={expForm.description} onChange={handleExpChange} rows="3" /></div>
                        <button type="submit" className="login-btn">{editingExpId ? 'Update Experience' : 'Add Experience'}</button>
                        {editingExpId && <button type="button" onClick={cancelEditExp} className="btn-danger mt-3 w-100">Cancel Edit</button>}
                    </form>
                </div>

                <div className="item-list">
                    {experiences.map(exp => (
                        <div key={exp._id} className="glass-card p-4 mb-3 d-flex justify-content-between align-items-center">
                            <div>
                                <h4 className="mb-1">{exp.jobTitle} <span className="text-primary">@ {exp.company}</span></h4>
                                <p className="text-muted small mb-2">{exp.duration}</p>
                            </div>
                            <div className="d-flex gap-2">
                                <button onClick={() => handleEditExp(exp)} className="btn-edit">Edit</button>
                                <button onClick={() => deleteExp(exp._id)} className="btn-danger">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Education Section */}
            <section>
                <h3 className="mb-3 text-light">Education</h3>
                <div className="glass-card p-4 mb-4">
                    <form onSubmit={handleEduSubmit}>
                        <div className="row">
                            <div className="col-md-6 form-group mb-3"><label className="text-muted mb-2">School/University</label><input className="login-input" type="text" name="school" value={eduForm.school} onChange={handleEduChange} required /></div>
                            <div className="col-md-6 form-group mb-3"><label className="text-muted mb-2">Degree</label><input className="login-input" type="text" name="degree" value={eduForm.degree} onChange={handleEduChange} required /></div>
                        </div>
                        <div className="form-group mb-3"><label className="text-muted mb-2">Duration</label><input className="login-input" type="text" name="duration" value={eduForm.duration} onChange={handleEduChange} required /></div>
                        <div className="form-group mb-4"><label className="text-muted mb-2">Description</label><textarea className="login-input" name="description" value={eduForm.description} onChange={handleEduChange} rows="3" /></div>
                        <button type="submit" className="login-btn">{editingEduId ? 'Update Education' : 'Add Education'}</button>
                        {editingEduId && <button type="button" onClick={cancelEditEdu} className="btn-danger mt-3 w-100">Cancel Edit</button>}
                    </form>
                </div>

                <div className="item-list">
                    {education.map(edu => (
                        <div key={edu._id} className="glass-card p-4 mb-3 d-flex justify-content-between align-items-center">
                            <div>
                                <h4 className="mb-1">{edu.degree}</h4>
                                <p className="text-secondary mb-1">{edu.school}</p>
                                <p className="text-muted small mb-0">{edu.duration}</p>
                            </div>
                            <div className="d-flex gap-2">
                                <button onClick={() => handleEditEdu(edu)} className="btn-edit">Edit</button>
                                <button onClick={() => deleteEdu(edu._id)} className="btn-danger">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default ExperienceManager;
