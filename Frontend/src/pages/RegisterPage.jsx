import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register({ name, email, password });
            navigate('/login');
        } catch (err) {
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: 'calc(100vh - 80px)', 
            backgroundColor: '#f6f7f8'
        }}>
            <div style={{ 
                backgroundColor: '#fff', 
                padding: '2.5rem', 
                borderRadius: '12px', 
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)', 
                width: '100%', 
                maxWidth: '440px',
                border: '1px solid #e1e4e8'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '0.5rem', color: '#1a1f36' }}>Create Account</h2>
                    <p style={{ color: '#697386', fontSize: '0.95rem' }}>Start managing your inventory.</p>
                </div>

                <div style={{ 
                    display: 'flex', 
                    backgroundColor: '#f6f7f8', 
                    padding: '4px', 
                    borderRadius: '8px', 
                    marginBottom: '2rem' 
                }}>
                    <Link 
                        to="/login"
                        style={{ 
                            flex: 1, 
                            padding: '8px', 
                            textAlign: 'center',
                            textDecoration: 'none',
                            borderRadius: '6px', 
                            color: '#697386', 
                            fontWeight: '600', 
                            fontSize: '0.9rem',
                            transition: 'color 0.2s'
                        }}
                    >
                        Log In
                    </Link>
                    <button 
                        style={{ 
                            flex: 1, 
                            padding: '8px', 
                            border: 'none', 
                            borderRadius: '6px', 
                            backgroundColor: '#fff', 
                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)', 
                            fontWeight: '600', 
                            fontSize: '0.9rem',
                            color: '#1a1f36',
                            cursor: 'default'
                        }}
                    >
                        Register
                    </button>
                </div>

                {error && (
                    <div style={{ 
                        backgroundColor: '#fff2f0', 
                        border: '1px solid #ffccc7', 
                        color: '#ff4d4f', 
                        padding: '0.75rem', 
                        borderRadius: '6px', 
                        marginBottom: '1.5rem',
                        fontSize: '0.9rem'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1.25rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.9rem', color: '#3c4257' }}>Full Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder="John Doe"
                            style={{ 
                                width: '100%', 
                                padding: '0.75rem', 
                                borderRadius: '6px', 
                                border: '1px solid #e1e4e8', 
                                fontSize: '0.95rem',
                                outline: 'none',
                                transition: 'border-color 0.2s'
                            }}
                            onFocus={(e) => e.target.style.borderColor = 'var(--primary-color)'}
                            onBlur={(e) => e.target.style.borderColor = '#e1e4e8'}
                        />
                    </div>
                    <div style={{ marginBottom: '1.25rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.9rem', color: '#3c4257' }}>Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="you@example.com"
                            style={{ 
                                width: '100%', 
                                padding: '0.75rem', 
                                borderRadius: '6px', 
                                border: '1px solid #e1e4e8', 
                                fontSize: '0.95rem',
                                outline: 'none',
                                transition: 'border-color 0.2s'
                            }}
                            onFocus={(e) => e.target.style.borderColor = 'var(--primary-color)'}
                            onBlur={(e) => e.target.style.borderColor = '#e1e4e8'}
                        />
                    </div>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.9rem', color: '#3c4257' }}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                            style={{ 
                                width: '100%', 
                                padding: '0.75rem', 
                                borderRadius: '6px', 
                                border: '1px solid #e1e4e8', 
                                fontSize: '0.95rem',
                                outline: 'none',
                                transition: 'border-color 0.2s'
                            }}
                            onFocus={(e) => e.target.style.borderColor = 'var(--primary-color)'}
                            onBlur={(e) => e.target.style.borderColor = '#e1e4e8'}
                        />
                    </div>
                    <button 
                        type="submit" 
                        style={{ 
                            width: '100%', 
                            padding: '0.75rem', 
                            backgroundColor: 'var(--primary-color)', 
                            color: '#fff', 
                            border: 'none', 
                            borderRadius: '6px', 
                            fontWeight: '600', 
                            fontSize: '0.95rem', 
                            cursor: 'pointer',
                            transition: 'background-color 0.2s'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#0052cc'}
                        onMouseOut={(e) => e.target.style.backgroundColor = 'var(--primary-color)'}
                    >
                        Create Account
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
