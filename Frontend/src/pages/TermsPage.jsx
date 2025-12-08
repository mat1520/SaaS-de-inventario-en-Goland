import React from 'react';

const TermsPage = () => {
    return (
        <div className="container" style={{ padding: '4rem 2rem' }}>
            <h1 style={{ marginBottom: '2rem' }}>Terms and Conditions</h1>
            <div className="card">
                <p>Welcome to Inventify. By using our service, you agree to these terms.</p>
                <h3 style={{ marginTop: '1.5rem' }}>1. Use of Service</h3>
                <p>The service is provided "as is". We reserve the right to modify or suspend the service at any time.</p>
                <h3 style={{ marginTop: '1.5rem' }}>2. User Accounts</h3>
                <p>You are responsible for maintaining the security of your account and password.</p>
            </div>
        </div>
    );
};

export default TermsPage;