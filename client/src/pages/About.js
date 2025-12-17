import React, { useEffect, useState } from 'react';
import axios from 'axios';

function About() {
  const [profile, setProfile] = useState({});
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const [aboutRes, eduRes, expRes] = await Promise.all([
          axios.get("/api/about"),
          axios.get("/api/experience/education"),
          axios.get("/api/experience/experience")
        ]);
        setProfile(aboutRes.data || {});
        setEducation(eduRes.data);
        setExperience(expRes.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    getData();
  }, []);

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4 text-center">
          <img src={profile.profileImage || "https://i.pravatar.cc/300"} alt="Profile" className="img-fluid rounded-circle mb-3" style={{ maxWidth: 250 }} />
        </div>
        <div className="col-md-8">
          <h2>About Me</h2>
          <p className="lead">{profile.bio}</p>

          {profile.email && <p><strong>Email:</strong> {profile.email}</p>}
        </div>
      </div>

      <hr className="my-5" />

      <div className="row">
        <div className="col-md-6">
          <h3>Experience</h3>
          <div className="list-group">
            {experience.map(exp => (
              <div key={exp._id} className="list-group-item">
                <h5>{exp.jobTitle}</h5>
                <h6 className="mb-2 text-muted">{exp.company} | {exp.duration}</h6>
                <p className="mb-1">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-6">
          <h3>Education</h3>
          <div className="list-group">
            {education.map(edu => (
              <div key={edu._id} className="list-group-item">
                <h5>{edu.degree}</h5>
                <h6 className="mb-2 text-muted">{edu.school} | {edu.duration}</h6>
                <p className="mb-1">{edu.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;