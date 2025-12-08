import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav style={{ backgroundColor: 'var(--card-bg)', color: 'var(--text-color)', padding: '1rem 0', boxShadow: 'var(--shadow)', borderBottom: '1px solid var(--border-color)' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Link to="/" style={{ color: 'var(--primary-color)', textDecoration: 'none' }}>SaaS Inventario</Link>
                </div>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <button onClick={toggleTheme} style={{ background: 'none', border: 'none', fontSize: '1.2rem', color: 'var(--text-color)' }}>
                        {theme === 'light' ? '🌙' : '☀️'}
                    </button>
                    {user ? (
                        <>
                            <Link to="/dashboard" className="nav-link">Dashboard</Link>
                            <Link to="/products" className="nav-link">Inventario</Link>
                            <Link to="/profile" className="nav-link">Perfil</Link>
                            <button onClick={handleLogout} className="btn btn-danger" style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }}>Salir</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-link">Iniciar Sesión</Link>
                            <Link to="/register" className="btn btn-success" style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }}>Registrarse</Link>
                        </>
                    )}
                </div>
            </div>
            <style>{`
                .nav-link {
                    color: var(--text-color);
                    text-decoration: none;
                    font-weight: 500;
                    transition: color 0.2s;
                }
                .nav-link:hover {
                    color: var(--primary-color);
                }
                @media (max-width: 768px) {
                    .container {
                        flex-direction: column;
                        gap: 1rem;
                    }
                }
            `}</style>
        </nav>
    );
};

export default Navbar;
