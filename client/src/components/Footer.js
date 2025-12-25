

import React from 'react';

const Footer = () => {
    return (
        <footer className="text-center py-4 mt-auto" style={{
            background: 'var(--bg-dark)',
            borderTop: '1px solid var(--glass-border)'
        }}>
            <div className="container">
                <p className="mb-2" style={{ color: 'var(--text-muted)' }}>© {new Date().getFullYear()} Nikhitha. Built with React & Node.js</p>
                <div className="d-flex justify-content-center gap-4 mt-3">
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', textDecoration: 'none' }} className="hover-text-main">
                        <i className="bi bi-github"></i> GitHub
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', textDecoration: 'none' }} className="hover-text-main">
                        <i className="bi bi-linkedin"></i> LinkedIn
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
