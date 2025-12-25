import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

function Home() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const API_BASE = process.env.NODE_ENV === 'production'
          ? 'https://nikhitha-portfolio-app.onrender.com'
          : '';
        const res = await axios.get(`${API_BASE}/api/about`);
        setProfile(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  return (
    <div className="home-container d-flex align-items-center justify-content-center">
      <div className="container text-center">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="glass-card p-5 animate-fade-in">
              <span className="badge bg-secondary mb-3 px-3 py-2 rounded-pill">Welcome to my world</span>
              <h1 className="display-3 fw-bold mb-4">
                Hi, I'm <span className="text-gradient">{profile?.name || "Nikhitha"}</span>
              </h1>
              <h3 className="h2 mb-4 text-muted fw-normal">
                {profile?.role || "Full Stack Developer"}
              </h3>
              <p className="lead mb-5 text-light opacity-75 mx-auto" style={{ maxWidth: '600px' }}>
                {profile?.bio || "Passionate about building scalable web applications and intuitive user experiences."}
              </p>

              <div className="d-flex justify-content-center gap-3">
                <Link to="/projects" className="btn-premium">
                  View My Work
                </Link>
                <Link to="/contact" className="btn btn-outline-light rounded-pill px-4 py-2 fw-bold" style={{ borderWidth: '2px' }}>
                  Contact Me
                </Link>
              </div>

              {profile?.resumeUrl && (
                <div className="mt-5 pt-4 border-top border-secondary border-opacity-25">
                  <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="text-decoration-none text-muted hover-text-main">
                    <i className="bi bi-file-earmark-person me-2"></i>Download Resume
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
