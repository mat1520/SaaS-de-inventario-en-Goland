import React from 'react';

const SupportPage = () => {
    return (
        <div className="container" style={{ padding: '4rem 2rem' }}>
            <h1 style={{ marginBottom: '2rem' }}>Support</h1>
            <div className="card">
                <p>Need help? We are here to assist you.</p>
                <h3 style={{ marginTop: '1.5rem' }}>Contact</h3>
                <p>Send us an email at <a href="mailto:support@inventify.com" style={{ color: 'var(--primary-color)' }}>support@inventify.com</a></p>
                <h3 style={{ marginTop: '1.5rem' }}>Business Hours</h3>
                <p>Monday to Friday: 9:00 AM - 6:00 PM</p>
            </div>
        </div>
    );
};

export default SupportPage;