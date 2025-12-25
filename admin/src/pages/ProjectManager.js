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
    const [imageFile, setImageFile] = useState(null);
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

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const uploadImage = async () => {
        if (!imageFile) return formData.imageUrl;
        const data = new FormData();
        data.append('image', imageFile);
        try {
            const res = await axios.post(`${API_URL}/api/upload`, data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return res.data; // Returns the file path
        } catch (err) {
            console.error('Image upload failed', err);
            return formData.imageUrl; // Fallback
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            };

            const uploadedImageUrl = await uploadImage();

            // Convert techStack string to array
            const projectData = {
                ...formData,
                imageUrl: uploadedImageUrl,
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
            setImageFile(null);
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

            <div className="row">
                {/* Form Section */}
                <div className="col-lg-5 mb-4">
                    <div className="glass-card p-4">
                        <h4 className="text-muted mb-3">{editingId ? 'Edit Project' : 'Add New Project'}</h4>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-3">
                                <label className="text-muted mb-2 small text-uppercase" style={{ letterSpacing: '1px' }}>Project Title</label>
                                <input className="login-input" type="text" name="title" value={formData.title} onChange={handleChange} placeholder="e.g. E-Commerce Platform" required />
                            </div>
                            <div className="form-group mb-3">
                                <label className="text-muted mb-2 small text-uppercase" style={{ letterSpacing: '1px' }}>Description</label>
                                <textarea className="login-input" name="description" value={formData.description} onChange={handleChange} rows="4" placeholder="Brief overview..." required />
                            </div>
                            <div className="form-group mb-3">
                                <label className="text-muted mb-2 small text-uppercase" style={{ letterSpacing: '1px' }}>Tech Stack</label>
                                <input className="login-input" type="text" name="techStack" value={formData.techStack} onChange={handleChange} placeholder="React, Node.js, MongoDB" required />
                            </div>
                            <div className="row">
                                <div className="col-md-6 form-group mb-3">
                                    <label className="text-muted mb-2 small text-uppercase" style={{ letterSpacing: '1px' }}>GitHub Link</label>
                                    <input className="login-input" type="text" name="githubLink" value={formData.githubLink} onChange={handleChange} placeholder="https://github..." />
                                </div>
                                <div className="col-md-6 form-group mb-3">
                                    <label className="text-muted mb-2 small text-uppercase" style={{ letterSpacing: '1px' }}>Live Link</label>
                                    <input className="login-input" type="text" name="liveLink" value={formData.liveLink} onChange={handleChange} placeholder="https://..." />
                                </div>
                            </div>
                            <div className="form-group mb-4">
                                <label className="text-muted mb-2 small text-uppercase" style={{ letterSpacing: '1px' }}>Project Image</label>
                                <input className="login-input" type="file" onChange={handleFileChange} accept="image/*" />
                                {formData.imageUrl && <div className="mt-2"><small className="text-muted">Current: </small><span className="text-info text-truncate d-inline-block" style={{ maxWidth: '200px' }}>{formData.imageUrl}</span></div>}
                            </div>

                            <button type="submit" className="login-btn w-100">
                                <i className={`bi ${editingId ? 'bi-check-lg' : 'bi-plus-lg'} me-2`}></i>
                                {editingId ? 'Update Project' : 'Add Project'}
                            </button>

                            {editingId && (
                                <button
                                    type="button"
                                    onClick={() => { setEditingId(null); setFormData({ title: '', description: '', techStack: '', githubLink: '', liveLink: '', imageUrl: '' }); setImageFile(null); }}
                                    className="btn btn-sm btn-outline-danger w-100 mt-2 border-0"
                                >
                                    Cancel Edit
                                </button>
                            )}
                        </form>
                    </div>
                </div>

                {/* List Section */}
                <div className="col-lg-7">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4 className="text-muted m-0">Existing Projects</h4>
                        <span className="badge bg-secondary opacity-50">{projects.length} Total</span>
                    </div>

                    <div className="project-list" style={{ maxHeight: '80vh', overflowY: 'auto', paddingRight: '5px' }}>
                        {projects.map((project) => (
                            <div key={project._id} className="glass-card p-3 mb-3 position-relative transition-all hover-scale" style={{ borderLeft: `4px solid var(--primary)` }}>
                                <div className="d-flex justify-content-between align-items-start">
                                    <div style={{ flex: 1 }}>
                                        <h5 className="mb-2 text-white">{project.title}</h5>
                                        <p className="text-muted small mb-2 text-truncate-2" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                            {project.description}
                                        </p>
                                        <div className="d-flex flex-wrap gap-1 mb-2">
                                            {project.techStack.slice(0, 4).map((tech, idx) => (
                                                <span key={idx} className="badge" style={{ background: 'rgba(255,255,255,0.1)', fontWeight: 'normal' }}>{tech}</span>
                                            ))}
                                            {project.techStack.length > 4 && <span className="badge text-muted">+{project.techStack.length - 4}</span>}
                                        </div>
                                        {project.imageUrl && (
                                            <div className="mb-2">
                                                <img src={`${API_URL}${project.imageUrl}`} alt="Preview" style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} onError={(e) => e.target.style.display = 'none'} />
                                            </div>
                                        )}
                                        <div className="d-flex gap-3 small">
                                            {project.githubLink && <a href={project.githubLink} target="_blank" rel="noreferrer" className="text-decoration-none text-info"><i className="bi bi-github me-1"></i>Code</a>}
                                            {project.liveLink && <a href={project.liveLink} target="_blank" rel="noreferrer" className="text-decoration-none text-success"><i className="bi bi-link-45deg me-1"></i>Demo</a>}
                                        </div>
                                    </div>
                                    <div className="d-flex flex-column gap-2 ms-3">
                                        <button className="btn-icon-edit" onClick={() => handleEdit(project)} title="Edit">
                                            <i className="bi bi-pencil-fill"></i>
                                        </button>
                                        <button className="btn-icon-delete" onClick={() => handleDelete(project._id)} title="Delete">
                                            <i className="bi bi-trash-fill"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {projects.length === 0 && (
                            <div className="text-center text-muted py-5 glass-card">
                                <i className="bi bi-folder2-open display-4 mb-3 d-block opacity-25"></i>
                                No projects added yet.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectManager;
