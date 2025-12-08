import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer style={{ 
            borderTop: '1px solid var(--border-color)', 
            backgroundColor: 'var(--secondary-color)',
            padding: '2rem 0',
            marginTop: 'auto'
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ color: 'var(--text-secondary)', width: '20px', height: '20px' }}>
                        <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z" fill="currentColor"></path>
                        </svg>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>© {new Date().getFullYear()} Inventify. All rights reserved.</p>
                </div>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                    <Link to="/terms" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: '500' }}>Terms</Link>
                    <Link to="/privacy" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: '500' }}>Privacy</Link>
                    <Link to="/support" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: '500' }}>Contact</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
