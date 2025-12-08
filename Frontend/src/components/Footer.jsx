import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: 'var(--card-bg)', color: 'var(--text-color)', padding: '1rem 0', marginTop: 'auto', fontSize: '0.85rem', borderTop: '1px solid var(--border-color)' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <span style={{ fontWeight: 'bold' }}>SaaS Inventario</span> &copy; {new Date().getFullYear()}
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <Link to="/terms" style={{ color: 'var(--text-color)', textDecoration: 'none', opacity: 0.8 }}>Términos</Link>
                    <Link to="/privacy" style={{ color: 'var(--text-color)', textDecoration: 'none', opacity: 0.8 }}>Privacidad</Link>
                    <Link to="/support" style={{ color: 'var(--text-color)', textDecoration: 'none', opacity: 0.8 }}>Soporte</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
