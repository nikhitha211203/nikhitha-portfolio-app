import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Skills() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    axios.get("/api/skills")
      .then(res => setSkills(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Skills</h2>
      <div className="row justify-content-center">
        <div className="col-md-8">
          {skills.map(s => (
            <div key={s._id} className="mb-3">
              <div className="d-flex justify-content-between">
                <span>{s.name} <small className="text-muted">({s.level})</small></span>
                <span>{s.progress}%</span>
              </div>
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: `${s.progress}%` }}
                  aria-valuenow={s.progress}
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Skills;
