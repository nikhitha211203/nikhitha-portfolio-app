import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const ProjectManager = ({ setToken }) => {
    const [projects, setProjects] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        techStack: '',
        githubLink: '',
        liveLink: '',
        imageUrl: ''
    });
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const API_URL = process.env.REACT_APP_API_URL || 'https://nikhitha-portfolio-app.onrender.com';

    // Fetch Projects
    const fetchProjects = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/projects`);
            setProjects(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            };

            // Convert techStack string to array
            const projectData = {
                ...formData,
                techStack: formData.techStack.split(',').map(tech => tech.trim())
            };

            if (editingId) {
                await axios.put(`${API_URL}/api/projects/${editingId}`, projectData, config);
                setMessage('Project Updated Successfully');
            } else {
                await axios.post(`${API_URL}/api/projects`, projectData, config);
                setMessage('Project Added Successfully');
            }

            setFormData({
                title: '',
                description: '',
                techStack: '',
                githubLink: '',
                liveLink: '',
                imageUrl: ''
            });
            setEditingId(null);
            fetchProjects();
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            setError(err.response?.data?.msg || 'Error saving project');
            setTimeout(() => setError(''), 3000);
        }
    };

    const handleEdit = (project) => {
        setEditingId(project._id);
        setFormData({
            title: project.title,
            description: project.description,
            techStack: project.techStack.join(', '),
            githubLink: project.githubLink || '',
            liveLink: project.liveLink || '',
            imageUrl: project.imageUrl || ''
        });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                const config = {
                    headers: {
                        'x-auth-token': localStorage.getItem('token')
                    }
                };
                await axios.delete(`${API_URL}/api/projects/${id}`, config);
                fetchProjects();
                setMessage('Project Deleted');
                setTimeout(() => setMessage(''), 3000);
            } catch (err) {
                setError('Error deleting project');
            }
        }
    };

    return (
        <div>
            <Navbar setToken={setToken} />
            <div className="manager-container">
                <h2>Manage Projects</h2>
                {message && <p className="success-msg" style={{ color: 'green' }}>{message}</p>}
                {error && <p className="error-msg" style={{ color: 'red' }}>{error}</p>}

                <form onSubmit={handleSubmit} className="project-form">
                    <div className="form-group">
                        <label>Title</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Tech Stack (comma separated)</label>
                        <input type="text" name="techStack" value={formData.techStack} onChange={handleChange} placeholder="React, Node.js, MongoDB" />
                    </div>
                    <div className="form-group">
                        <label>GitHub Link</label>
                        <input type="text" name="githubLink" value={formData.githubLink} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Live Link</label>
                        <input type="text" name="liveLink" value={formData.liveLink} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Image URL</label>
                        <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="https://example.com/image.png" />
                    </div>
                    <button type="submit" className="btn-primary">
                        {editingId ? 'Update Project' : 'Add Project'}
                    </button>
                    {editingId && <button type="button" onClick={() => { setEditingId(null); setFormData({ title: '', description: '', techStack: '', githubLink: '', liveLink: '', imageUrl: '' }); }} className="btn-danger">Cancel Edit</button>}
                </form>

                <div className="item-list">
                    {projects.map(project => (
                        <div key={project._id} className="item-card">
                            <div>
                                <h4>{project.title}</h4>
                                <p>{project.description.substring(0, 100)}...</p>
                            </div>
                            <div>
                                <button onClick={() => handleEdit(project)} className="btn-edit">Edit</button>
                                <button onClick={() => handleDelete(project._id)} className="btn-danger">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectManager;
