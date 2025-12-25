import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Projects.css';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_BASE = process.env.NODE_ENV === 'production'
      ? 'https://nikhitha-portfolio-app.onrender.com'
      : '';
    axios.get(`${API_BASE}/api/projects`)
      .then(res => {
        setProjects(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="spinner-border text-primary" role="status"></div>
    </div>
  );

  return (
    <div className="projects-container py-5 mt-5">
      <div className="container">
        <h2 className="text-center mb-5 display-5 fw-bold">Featured <span className="text-gradient">Projects</span></h2>

        <div className="row g-4 justify-content-center">
          {projects.map(p => (
            <div className="col-lg-4 col-md-6" key={p._id}>
              <div className="glass-card project-card h-100 d-flex flex-column">
                <div className="project-img-wrapper">
                  {p.imageUrl ? (
                    <img src={p.imageUrl} className="card-img-top project-img" alt={p.title} />
                  ) : (
                    <div className="project-placeholder d-flex align-items-center justify-content-center text-white">
                      <div className="text-center p-3">
                        <i className="bi bi-code-slash fs-1 mb-2 opacity-50"></i>
                        <span className="d-block fw-bold opacity-75">Project Preview</span>
                      </div>
                    </div>
                  )}
                  <div className="project-overlay">
                    <div className="d-flex gap-3">
                      {p.githubLink && (
                        <a href={p.githubLink} target="_blank" rel="noreferrer" className="btn btn-light btn-sm rounded-circle p-2" title="GitHub">
                          <i className="bi bi-github fs-5"></i>
                        </a>
                      )}
                      {p.liveLink && (
                        <a href={p.liveLink} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm rounded-circle p-2" title="Live Demo">
                          <i className="bi bi-box-arrow-up-right fs-5"></i>
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="card-body p-4 flex-grow-1 d-flex flex-column">
                  <h5 className="card-title fw-bold mb-3">{p.title}</h5>
                  <p className="card-text text-light opacity-75 small flex-grow-1">{p.description}</p>

                  <div className="mt-3">
                    <div className="d-flex flex-wrap gap-2">
                      {p.techStack && p.techStack.map((tech, i) => (
                        <span key={i} className="badge bg-dark border border-secondary text-secondary small-badge">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Projects;
