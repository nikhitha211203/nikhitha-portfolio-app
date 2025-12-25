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

    // Correct API URL for local/prod
    const API_URL = window.location.hostname === 'localhost'
        ? 'http://localhost:5000'
        : (process.env.REACT_APP_API_URL || 'https://nikhitha-portfolio-app.onrender.com');

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
            setTimeout(() => setMessage(''), 3000);
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
            setTimeout(() => setMessage(''), 3000);
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
            <h2 className="mb-4 text-gradient">Journey & Education</h2>
            {message && <div className="glass-card p-3 mb-3 text-success text-center">{message}</div>}

            <div className="row">
                <div className="col-lg-6 mb-4">
                    <h4 className="text-muted mb-3">Experience</h4>
                    <div className="glass-card p-4 mb-4">
                        <form onSubmit={handleExpSubmit}>
                            <div className="form-group mb-3">
                                <label className="text-muted mb-2 small text-uppercase">Role</label>
                                <input className="login-input" type="text" name="jobTitle" value={expForm.jobTitle} onChange={handleExpChange} placeholder="e.g. Senior Developer" required />
                            </div>
                            <div className="form-group mb-3">
                                <label className="text-muted mb-2 small text-uppercase">Company</label>
                                <input className="login-input" type="text" name="company" value={expForm.company} onChange={handleExpChange} placeholder="e.g. Google" required />
                            </div>
                            <div className="form-group mb-3">
                                <label className="text-muted mb-2 small text-uppercase">Duration</label>
                                <input className="login-input" type="text" name="duration" value={expForm.duration} onChange={handleExpChange} placeholder="e.g. 2020 - Present" required />
                            </div>
                            <div className="form-group mb-3">
                                <label className="text-muted mb-2 small text-uppercase">Details</label>
                                <textarea className="login-input" name="description" value={expForm.description} onChange={handleExpChange} rows="3" required />
                            </div>
                            <button type="submit" className="login-btn w-100">
                                {editingExpId ? 'Update Experience' : 'Add Experience'}
                            </button>
                            {editingExpId && <button type="button" onClick={cancelEditExp} className="btn btn-sm text-danger mt-2 mx-auto d-block">Cancel</button>}
                        </form>
                    </div>

                    <div className="d-flex flex-column gap-3">
                        {experiences.map(exp => (
                            <div key={exp._id} className="glass-card p-4 position-relative hover-scale transition-all" style={{ borderLeft: '4px solid var(--secondary)' }}>
                                <div className="d-flex justify-content-between align-items-start">
                                    <div>
                                        <h5 className="mb-1 text-white">{exp.jobTitle}</h5>
                                        <p className="text-primary mb-1 small">{exp.company}</p>
                                        <small className="text-muted d-block mb-2">{exp.duration}</small>
                                        <p className="text-light small mb-0 opacity-75">{exp.description}</p>
                                    </div>
                                    <div className="d-flex flex-column gap-2 ms-3">
                                        <button onClick={() => handleEditExp(exp)} className="btn-icon-edit"><i className="bi bi-pencil-fill"></i></button>
                                        <button onClick={() => deleteExp(exp._id)} className="btn-icon-delete"><i className="bi bi-trash-fill"></i></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="col-lg-6">
                    <h4 className="text-muted mb-3">Education</h4>
                    <div className="glass-card p-4 mb-4">
                        <form onSubmit={handleEduSubmit}>
                            <div className="form-group mb-3">
                                <label className="text-muted mb-2 small text-uppercase">Degree</label>
                                <input className="login-input" type="text" name="degree" value={eduForm.degree} onChange={handleEduChange} placeholder="e.g. BS Computer Science" required />
                            </div>
                            <div className="form-group mb-3">
                                <label className="text-muted mb-2 small text-uppercase">Institution</label>
                                <input className="login-input" type="text" name="school" value={eduForm.school} onChange={handleEduChange} placeholder="e.g. Stanford University" required />
                            </div>
                            <div className="form-group mb-3">
                                <label className="text-muted mb-2 small text-uppercase">Year</label>
                                <input className="login-input" type="text" name="duration" value={eduForm.duration} onChange={handleEduChange} placeholder="e.g. 2016 - 2020" required />
                            </div>
                            <div className="form-group mb-3">
                                <label className="text-muted mb-2 small text-uppercase">Details</label>
                                <textarea className="login-input" name="description" value={eduForm.description} onChange={handleEduChange} rows="3" />
                            </div>
                            <button type="submit" className="login-btn w-100">
                                {editingEduId ? 'Update Education' : 'Add Education'}
                            </button>
                            {editingEduId && <button type="button" onClick={cancelEditEdu} className="btn btn-sm text-danger mt-2 mx-auto d-block">Cancel</button>}
                        </form>
                    </div>

                    <div className="d-flex flex-column gap-3">
                        {education.map(edu => (
                            <div key={edu._id} className="glass-card p-4 position-relative hover-scale transition-all" style={{ borderLeft: '4px solid var(--accent)' }}>
                                <div className="d-flex justify-content-between align-items-start">
                                    <div>
                                        <h5 className="mb-1 text-white">{edu.degree}</h5>
                                        <p className="text-accent mb-1 small" style={{ color: 'var(--accent)' }}>{edu.school}</p>
                                        <small className="text-muted d-block mb-2">{edu.duration}</small>
                                        <p className="text-light small mb-0 opacity-75">{edu.description}</p>
                                    </div>
                                    <div className="d-flex flex-column gap-2 ms-3">
                                        <button onClick={() => handleEditEdu(edu)} className="btn-icon-edit"><i className="bi bi-pencil-fill"></i></button>
                                        <button onClick={() => deleteEdu(edu._id)} className="btn-icon-delete"><i className="bi bi-trash-fill"></i></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExperienceManager;
