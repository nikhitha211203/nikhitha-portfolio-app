import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './About.css';

function About() {
  const [profile, setProfile] = useState({});
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const API_BASE = process.env.NODE_ENV === 'production'
          ? 'https://nikhitha-portfolio-app.onrender.com'
          : '';
        const [aboutRes, eduRes, expRes] = await Promise.all([
          axios.get(`${API_BASE}/api/about`),
          axios.get(`${API_BASE}/api/education`),
          axios.get(`${API_BASE}/api/experience`)
        ]);
        setProfile(aboutRes.data || {});
        setEducation(eduRes.data || []);
        setExperience(expRes.data || []);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    getData();
  }, []);

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="spinner-border text-primary" role="status"></div>
    </div>
  );

  return (
    <div className="about-container py-5 mt-5">
      <div className="container">

        {/* Profile Section */}
        <div className="glass-card p-4 p-md-5 mb-5 animate-fade-in">
          <div className="row align-items-center">
            <div className="col-md-4 text-center mb-4 mb-md-0">
              <div className="profile-img-container mx-auto">
                <img
                  src={profile.profileUrl || "https://i.pravatar.cc/300"}
                  alt="Profile"
                  className="img-fluid rounded-circle profile-img"
                />
              </div>
            </div>
            <div className="col-md-8">
              <h2 className="mb-2"><span className="text-gradient">About Me</span></h2>
              {profile.role && <h4 className="text-muted mb-4">{profile.role}</h4>}
              <p className="lead text-light opacity-75">{profile.bio}</p>

              <div className="mt-4 row">
                <div className="col-md-6 mb-2">
                  <i className="bi bi-envelope-fill text-primary me-2"></i>
                  {profile.email}
                </div>
                {profile.phone && (
                  <div className="col-md-6 mb-2">
                    <i className="bi bi-telephone-fill text-primary me-2"></i>
                    {profile.phone}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Experience & Education */}
        <div className="row">
          <div className="col-lg-6 mb-4">
            <h3 className="mb-4 ps-2 border-start border-4 border-secondary">Education</h3>
            <div className="timeline">
              {education.map(edu => (
                <div key={edu._id} className="timeline-item glass-card p-4 mb-3">
                  <span className="badge bg-secondary mb-2">{edu.duration}</span>
                  <h5 className="mt-1">{edu.degree}</h5>
                  <h6 className="text-muted mb-2">{edu.school}</h6>
                  <p className="small opacity-75 mb-0">{edu.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-6">
            <h3 className="mb-4 ps-2 border-start border-4 border-primary">Experience</h3>
            <div className="timeline">
              {experience.map(exp => (
                <div key={exp._id} className="timeline-item glass-card p-4 mb-3">
                  <span className="badge bg-primary mb-2">{exp.duration}</span>
                  <h5 className="mt-1">{exp.jobTitle}</h5>
                  <h6 className="text-muted mb-2">{exp.company}</h6>
                  <p className="small opacity-75 mb-0">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default About;
