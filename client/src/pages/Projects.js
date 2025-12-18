import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_BASE = process.env.NODE_ENV === 'production' ? 'https://nikhitha-portfolio-app.onrender.com' : '';
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

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">My Projects</h2>
      <div className="row">
        {projects.map(p => (
          <div className="col-md-4 mb-4" key={p._id}>
            <div className="card h-100 shadow-sm">
              {p.imageUrl ? (
                <img src={p.imageUrl} className="card-img-top" alt={p.title} style={{ height: 200, objectFit: 'cover' }} />
              ) : (
                <div style={{ height: 200, background: '#eee' }}></div>
              )}
              <div className="card-body">
                <h5 className="card-title">{p.title}</h5>
                <p className="card-text">{p.description}</p>
                <p><strong>Stack:</strong> {p.techStack && p.techStack.join(", ")}</p>
                <div className="d-flex gap-2">
                  {p.githubLink && <a href={p.githubLink} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">GitHub</a>}
                  {p.liveLink && <a href={p.liveLink} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">Live Demo</a>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
