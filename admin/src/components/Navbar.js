import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = ({ setToken, isOpen }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        setToken(null);
        localStorage.removeItem('token');
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path ? 'active' : '';

    return (
        <nav className={`navbar glass-panel ${!isOpen ? 'collapsed' : ''}`}>
            <div className="nav-brand">Admin Panel</div>
            <div className="nav-links">
                <Link to="/" className={isActive('/')}>
                    <i className="bi bi-speedometer2"></i> Dashboard
                </Link>
                <Link to="/about" className={isActive('/about')}>
                    <i className="bi bi-person-badge"></i> About Me
                </Link>
                <Link to="/projects" className={isActive('/projects')}>
                    <i className="bi bi-code-square"></i> Projects
                </Link>
                <Link to="/skills" className={isActive('/skills')}>
                    <i className="bi bi-lightning-charge"></i> Skills
                </Link>
                <Link to="/experience" className={isActive('/experience')}>
                    <i className="bi bi-briefcase"></i> Experience
                </Link>
                <Link to="/messages" className={isActive('/messages')}>
                    <i className="bi bi-chat-dots"></i> Messages
                </Link>
                <Link to="/theme" className={isActive('/theme')}>
                    <i className="bi bi-palette"></i> Theme
                </Link>

                <div className="mt-3 pt-3 border-top border-secondary">
                    <a href="https://nikhitha-portfolio-tan.vercel.app/" target="_blank" rel="noopener noreferrer">
                        <i className="bi bi-globe"></i> View Live Site
                    </a>
                </div>

                <button onClick={handleLogout} className="logout-btn">
                    <i className="bi bi-box-arrow-left"></i> Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
