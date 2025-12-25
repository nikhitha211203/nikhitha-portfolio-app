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
import ThemeManager from './pages/ThemeManager';

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
      <div className="glass-card login-box animate-fade-in">
        <h2 className="text-center mb-4 text-gradient">Admin Login</h2>
        {error && <p className="text-danger text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            className="login-input"
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-btn">Sign In</button>
        </form>
      </div>
    </div>
  );
};

// Dashboard Component
const Dashboard = () => {
  return (
    <div className="dashboard-content">
      <h2 className="mb-4">Welcome Back, <span className="text-gradient">Admin</span></h2>
      <div className="cards">
        <div className="glass-card dashboard-card">
          <Link to="/about">
            <span className="fs-1 mb-2 d-block">👤</span>
            <h3>About Me</h3>
            <p>Manage Profile & Bio</p>
          </Link>
        </div>
        <div className="glass-card dashboard-card">
          <Link to="/projects">
            <span className="fs-1 mb-2 d-block">💻</span>
            <h3>Projects</h3>
            <p>Manage Portfolio Work</p>
          </Link>
        </div>
        <div className="glass-card dashboard-card">
          <Link to="/skills">
            <span className="fs-1 mb-2 d-block">⚡</span>
            <h3>Skills</h3>
            <p>Technical Competencies</p>
          </Link>
        </div>
        <div className="glass-card dashboard-card">
          <Link to="/experience">
            <span className="fs-1 mb-2 d-block">💼</span>
            <h3>Experience</h3>
            <p>Work & Education Data</p>
          </Link>
        </div>
        <div className="glass-card dashboard-card">
          <Link to="/messages">
            <span className="fs-1 mb-2 d-block">💬</span>
            <h3>Messages</h3>
            <p>View Contact Requests</p>
          </Link>
        </div>
        <div className="glass-card dashboard-card">
          <Link to="/theme">
            <span className="fs-1 mb-2 d-block">🎨</span>
            <h3>Theme</h3>
            <p>Customize Colors</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

// Dashboard Component - No changes needed here directly

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="App">
      {token ? (
        <>
          <button className={`toggle-btn ${isSidebarOpen ? 'shifted' : ''}`} onClick={toggleSidebar}>
            <i className={`bi ${isSidebarOpen ? 'bi-x-lg' : 'bi-list'}`}></i>
          </button>
          <Navbar setToken={setToken} isOpen={isSidebarOpen} />
          <div className={`main-content ${!isSidebarOpen ? 'expanded' : ''}`}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/projects" element={<ProjectManager />} />
              <Route path="/skills" element={<SkillManager />} />
              <Route path="/experience" element={<ExperienceManager />} />
              <Route path="/about" element={<AboutManager />} />
              <Route path="/messages" element={<MessagesManager />} />
              <Route path="/theme" element={<ThemeManager />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </>
      ) : (
        <Routes>
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
