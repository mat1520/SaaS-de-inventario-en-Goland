import React from 'react';

const PrivacyPage = () => {
    return (
        <div className="container" style={{ padding: '4rem 2rem' }}>
            <h1 style={{ marginBottom: '2rem' }}>Privacy Policy</h1>
            <div className="card">
                <p>Your privacy is important to us.</p>
                <h3 style={{ marginTop: '1.5rem' }}>1. Data Collection</h3>
                <p>We collect basic information such as your name and email address to provide the service.</p>
                <h3 style={{ marginTop: '1.5rem' }}>2. Data Usage</h3>
                <p>We do not sell your data to third parties. We use the information to improve your experience.</p>
            </div>
        </div>
    );
};

export default PrivacyPage;