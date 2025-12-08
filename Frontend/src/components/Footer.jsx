import React from 'react';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: '#2c3e50', color: '#ecf0f1', padding: '1rem 0', marginTop: 'auto', fontSize: '0.85rem' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <span style={{ fontWeight: 'bold' }}>SaaS Inventario</span> &copy; {new Date().getFullYear()}
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <a href="#" style={{ color: '#bdc3c7', textDecoration: 'none' }}>Términos</a>
                    <a href="#" style={{ color: '#bdc3c7', textDecoration: 'none' }}>Privacidad</a>
                    <a href="#" style={{ color: '#bdc3c7', textDecoration: 'none' }}>Soporte</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
