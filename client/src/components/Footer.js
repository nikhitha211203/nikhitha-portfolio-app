import React from 'react';

const Footer = () => {
    return (
        <footer className="footer bg-dark text-white text-center py-3 mt-auto">
            <div className="container">
                <p className="mb-0">© {new Date().getFullYear()} Nikhitha. All Rights Reserved.</p>
                <div className="social-icons mt-2">
                    {/* Add actual social links here */}
                    <a href="#" className="text-white mx-2">GitHub</a>
                    <a href="#" className="text-white mx-2">LinkedIn</a>
                    <a href="#" className="text-white mx-2">Twitter</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
