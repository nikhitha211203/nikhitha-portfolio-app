import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const ExperienceManager = ({ setToken }) => {
    const [experiences, setExperiences] = useState([]);
    const [education, setEducation] = useState([]);

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
            await axios.post(`${API_URL}/api/experience`, expForm, config);
            setMessage('Experience Added');
            setExpForm({ jobTitle: '', company: '', duration: '', description: '' });
            fetchData();
        } catch (err) { setMessage('Error adding experience'); }
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
            await axios.post(`${API_URL}/api/education`, eduForm, config);
            setMessage('Education Added');
            setEduForm({ school: '', degree: '', duration: '', description: '' });
            fetchData();
        } catch (err) { setMessage('Error adding education'); }
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
        <div>
            <Navbar setToken={setToken} />
            <div className="manager-container">
                <h2>Manage Experience & Education</h2>
                {message && <p className="success-msg">{message}</p>}

                {/* Experience Section */}
                <section>
                    <h3>Add Experience</h3>
                    <form onSubmit={handleExpSubmit}>
                        <div className="form-group"><label>Job Title</label><input type="text" name="jobTitle" value={expForm.jobTitle} onChange={handleExpChange} required /></div>
                        <div className="form-group"><label>Company</label><input type="text" name="company" value={expForm.company} onChange={handleExpChange} required /></div>
                        <div className="form-group"><label>Duration</label><input type="text" name="duration" value={expForm.duration} onChange={handleExpChange} placeholder="e.g. Jan 2020 - Present" required /></div>
                        <div className="form-group"><label>Description</label><textarea name="description" value={expForm.description} onChange={handleExpChange} /></div>
                        <button type="submit" className="btn-primary">Add Experience</button>
                    </form>

                    <div className="item-list">
                        {experiences.map(exp => (
                            <div key={exp._id} className="item-card">
                                <div><h4>{exp.jobTitle} at {exp.company}</h4><p>{exp.duration}</p></div>
                                <button onClick={() => deleteExp(exp._id)} className="btn-danger">Delete</button>
                            </div>
                        ))}
                    </div>
                </section>

                <hr style={{ margin: '3rem 0' }} />

                {/* Education Section */}
                <section>
                    <h3>Add Education</h3>
                    <form onSubmit={handleEduSubmit}>
                        <div className="form-group"><label>School/University</label><input type="text" name="school" value={eduForm.school} onChange={handleEduChange} required /></div>
                        <div className="form-group"><label>Degree</label><input type="text" name="degree" value={eduForm.degree} onChange={handleEduChange} required /></div>
                        <div className="form-group"><label>Duration</label><input type="text" name="duration" value={eduForm.duration} onChange={handleEduChange} required /></div>
                        <div className="form-group"><label>Description</label><textarea name="description" value={eduForm.description} onChange={handleEduChange} /></div>
                        <button type="submit" className="btn-primary">Add Education</button>
                    </form>

                    <div className="item-list">
                        {education.map(edu => (
                            <div key={edu._id} className="item-card">
                                <div><h4>{edu.degree} - {edu.school}</h4><p>{edu.duration}</p></div>
                                <button onClick={() => deleteEdu(edu._id)} className="btn-danger">Delete</button>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ExperienceManager;
