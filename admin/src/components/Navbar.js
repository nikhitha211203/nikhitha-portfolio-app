import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ setToken }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        setToken(null);
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="nav-brand">Admin Panel</div>
            <div className="nav-links">
                <Link to="/">Dashboard</Link>
                <Link to="/projects">Projects</Link>
                <Link to="/skills">Skills</Link>
                <Link to="/experience">Experience</Link>
                <Link to="/about">About</Link>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
        </nav>
    );
};

export default Navbar;
