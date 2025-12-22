import React, { useState } from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Navbar from './components/Navbar';
import ProjectManager from './pages/ProjectManager';
import SkillManager from './pages/SkillManager';
import ExperienceManager from './pages/ExperienceManager';
import AboutManager from './pages/AboutManager';
import MessagesManager from './pages/MessagesManager';

// Simple Login Component
const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const API_URL = process.env.REACT_APP_API_URL || 'https://nikhitha-portfolio-app.onrender.com';
      const res = await axios.post(`${API_URL}/api/auth/login`, { email, password });
      setToken(res.data.token);
      localStorage.setItem('token', res.data.token);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || err.message || 'Login Failed');
    }
  };

  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

// Dashboard Component
const Dashboard = ({ setToken }) => {
  return (
    <div>
      <Navbar setToken={setToken} />
      <div className="dashboard">
        <header>
          <h1>Admin Dashboard</h1>
        </header>
        <main>
          <p>Welcome to the Admin Panel. You can manage your portfolio here.</p>
          <div className="cards">
            <div className="card">
              <Link to="/projects">
                <h3>Projects</h3>
                <p>Manage Projects</p>
              </Link>
            </div>
            <div className="card">
              <Link to="/skills">
                <h3>Skills</h3>
                <p>Manage Skills</p>
              </Link>
            </div>
            <div className="card">
              <Link to="/experience">
                <h3>Experience</h3>
                <p>Manage Experience</p>
              </Link>
            </div>
            <div className="card">
              <Link to="/about">
                <h3>About</h3>
                <p>Manage About</p>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};



function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={!token ? <Login setToken={setToken} /> : <Navigate to="/" />} />
        <Route path="/" element={token ? <Dashboard setToken={setToken} /> : <Navigate to="/login" />} />
        <Route path="/projects" element={token ? <ProjectManager setToken={setToken} /> : <Navigate to="/login" />} />
        <Route path="/skills" element={token ? <SkillManager setToken={setToken} /> : <Navigate to="/login" />} />
        <Route path="/experience" element={token ? <ExperienceManager setToken={setToken} /> : <Navigate to="/login" />} />
        <Route path="/about" element={token ? <AboutManager setToken={setToken} /> : <Navigate to="/login" />} />
        <Route path="/messages" element={token ? <MessagesManager setToken={setToken} /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
