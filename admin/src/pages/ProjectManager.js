import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectManager = () => {
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
        <div className="manager-container animate-fade-in">
            <h2 className="mb-4 text-gradient">Manage Projects</h2>

            {message && <div className="glass-card p-3 mb-3 text-success text-center">{message}</div>}
            {error && <div className="glass-card p-3 mb-3 text-danger text-center">{error}</div>}

            <div className="glass-card p-4 mb-5">
                <form onSubmit={handleSubmit} className="project-form">
                    <div className="form-group mb-3">
                        <label className="text-muted mb-2">Project Title</label>
                        <input className="login-input" type="text" name="title" value={formData.title} onChange={handleChange} required />
                    </div>
                    <div className="form-group mb-3">
                        <label className="text-muted mb-2">Description</label>
                        <textarea className="login-input" name="description" value={formData.description} onChange={handleChange} required rows="3" />
                    </div>
                    <div className="form-group mb-3">
                        <label className="text-muted mb-2">Tech Stack (comma separated)</label>
                        <input className="login-input" type="text" name="techStack" value={formData.techStack} onChange={handleChange} placeholder="React, Node.js, MongoDB" />
                    </div>
                    <div className="row">
                        <div className="col-md-6 form-group mb-3">
                            <label className="text-muted mb-2">GitHub Link</label>
                            <input className="login-input" type="text" name="githubLink" value={formData.githubLink} onChange={handleChange} />
                        </div>
                        <div className="col-md-6 form-group mb-3">
                            <label className="text-muted mb-2">Live Link</label>
                            <input className="login-input" type="text" name="liveLink" value={formData.liveLink} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-group mb-4">
                        <label className="text-muted mb-2">Image URL</label>
                        <input className="login-input" type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="https://example.com/image.png" />
                    </div>

                    <button type="submit" className="login-btn">
                        {editingId ? 'Update Project' : 'Add Project'}
                    </button>
                    {editingId && <button type="button" onClick={() => { setEditingId(null); setFormData({ title: '', description: '', techStack: '', githubLink: '', liveLink: '', imageUrl: '' }); }} className="btn-danger mt-3 w-100">Cancel Edit</button>}
                </form>
            </div>

            <div className="item-list">
                {projects.map(project => (
                    <div key={project._id} className="glass-card p-4 mb-3 d-flex justify-content-between align-items-center">
                        <div>
                            <h4 className="mb-2">{project.title}</h4>
                            <p className="text-muted mb-2" style={{ maxWidth: '600px' }}>{project.description.substring(0, 100)}...</p>
                            <small className="text-primary">{project.techStack.join(', ')}</small>
                        </div>
                        <div className="d-flex gap-2">
                            <button onClick={() => handleEdit(project)} className="btn-edit">Edit</button>
                            <button onClick={() => handleDelete(project._id)} className="btn-danger">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectManager;
