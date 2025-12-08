import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav style={{ backgroundColor: '#2c3e50', color: '#fff', padding: '1rem 0', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '1.8rem' }}>📦</span>
                    <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>SaaS de Inventario</Link>
                </div>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    {user ? (
                        <>
                            <Link to="/products" className="nav-link">Dashboard</Link>
                            <Link to="/profile" className="nav-link">Perfil</Link>
                            <button onClick={handleLogout} className="btn btn-danger" style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }}>Cerrar Sesión</button>
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
                    color: #ecf0f1;
                    text-decoration: none;
                    font-weight: 500;
                    transition: color 0.2s;
                }
                .nav-link:hover {
                    color: #3498db;
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
