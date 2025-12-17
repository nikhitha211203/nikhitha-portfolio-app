import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

// Simple Login Component
const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', { email, password });
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

// Simple Dashboard Component
const Dashboard = ({ token, setToken }) => {
  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <div className="dashboard">
      <header>
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
      </header>
      <main>
        <p>Welcome to the Admin Panel. You can manage your portfolio here.</p>
        <div className="cards">
          <div className="card"><h3>Projects</h3><p>Manage Projects</p></div>
          <div className="card"><h3>Skills</h3><p>Manage Skills</p></div>
          <div className="card"><h3>Experience</h3><p>Manage Experience</p></div>
        </div>
      </main>
    </div>
  );
};

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={!token ? <Login setToken={setToken} /> : <Navigate to="/" />} />
        <Route path="/" element={token ? <Dashboard token={token} setToken={setToken} /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
