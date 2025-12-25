import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Skills.css';

function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_BASE = process.env.NODE_ENV === 'production'
      ? 'https://nikhitha-portfolio-app.onrender.com'
      : '';
    axios.get(`${API_BASE}/api/skills`)
      .then(res => {
        setSkills(res.data);
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
    <div className="skills-container py-5 mt-5">
      <div className="container">
        <h2 className="text-center mb-5 display-5 fw-bold">My <span className="text-gradient">Skills</span></h2>

        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="row">
              {skills.map(s => (
                <div key={s._id} className="col-md-6 mb-4">
                  <div className="glass-card p-4 h-100 skill-card">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h5 className="mb-0">{s.name}</h5>
                      <span className="badge bg-dark border border-secondary">{s.category}</span>
                    </div>

                    <div className="progress" style={{ height: '10px', backgroundColor: 'rgba(255,255,255,0.1)' }}>
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{
                          width: `${s.level}%`,
                          background: 'var(--gradient-main)'
                        }}
                        aria-valuenow={s.level}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <div className="text-end mt-1">
                      <small className="text-muted">{s.level}% Proficiency</small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Skills;
