import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isAuthPage = ['/login', '/register'].includes(location.pathname);

    if (isAuthPage) {
        return (
            <nav style={{ 
                padding: '1rem 2rem', 
                borderBottom: '1px solid var(--border-color)',
                backgroundColor: '#fff'
            }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ color: 'var(--primary-color)', width: '24px', height: '24px' }}>
                            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z" fill="currentColor"></path>
                            </svg>
                        </div>
                        <Link to="/" style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text-color)' }}>Inventify</Link>
                    </div>
                    <Link to="/" style={{ color: 'var(--text-color)', fontSize: '0.9rem', fontWeight: '500' }}>Back to website</Link>
                </div>
            </nav>
        );
    }

    return (
        <nav style={{ 
            position: 'sticky', 
            top: 0, 
            zIndex: 50, 
            backgroundColor: 'rgba(246, 247, 248, 0.8)', 
            backdropFilter: 'blur(4px)', 
            borderBottom: '1px solid var(--border-color)',
            padding: '0.75rem 0'
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ color: 'var(--primary-color)', width: '24px', height: '24px' }}>
                        <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z" fill="currentColor"></path>
                        </svg>
                    </div>
                    <Link to="/" style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text-color)' }}>Inventify</Link>
                </div>
                
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    {user ? (
                        <>
                            <Link to="/dashboard" className="nav-link">Dashboard</Link>
                            <Link to="/products" className="nav-link">Inventory</Link>
                            <Link to="/reports" className="nav-link">Reports</Link>
                            <Link to="/settings" className="nav-link">Profile</Link>
                            <button onClick={handleLogout} className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>Sign Out</button>
                        </>
                    ) : (
                        <>
                            <div className="nav-links-desktop" style={{ display: 'flex', gap: '2rem' }}>
                                <a href="/#features" className="nav-link">Features</a>
                                <a href="/#pricing" className="nav-link">Pricing</a>
                                <a href="/#testimonials" className="nav-link">Testimonials</a>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <Link to="/login" className="nav-link">Log In</Link>
                                <Link to="/register" className="btn btn-primary">Sign Up</Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <style>{`
                .nav-link {
                    color: var(--text-color);
                    font-weight: 500;
                    font-size: 0.9rem;
                    transition: color 0.2s;
                }
                .nav-link:hover {
                    color: var(--primary-color);
                }
                @media (max-width: 768px) {
                    .nav-links-desktop {
                        display: none !important;
                    }
                }
            `}</style>
        </nav>
    );
};

export default Navbar;
