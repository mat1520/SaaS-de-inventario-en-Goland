import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Sidebar = () => {
    const location = useLocation();
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const isActive = (path) => location.pathname === path;

    const menuItems = [
        { path: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
        { path: '/products', icon: 'inventory_2', label: 'Inventory' },
        { path: '/reports', icon: 'bar_chart', label: 'Reports' },
        { path: '/settings', icon: 'settings', label: 'Settings' },
    ];

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <aside style={{
            width: '260px',
            height: '100vh',
            position: 'sticky',
            top: 0,
            borderRight: '1px solid var(--border-color)',
            backgroundColor: 'var(--card-bg)',
            display: 'flex',
            flexDirection: 'column',
            padding: '1.5rem',
            flexShrink: 0
        }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', paddingLeft: '0.5rem', textDecoration: 'none', color: 'inherit' }}>
                <div style={{ color: 'var(--primary-color)' }}>
                    <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z" fill="currentColor"/>
                    </svg>
                </div>
                <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Inventify</span>
            </Link>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                {menuItems.map((item) => (
                    <Link 
                        key={item.path}
                        to={item.path}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '0.75rem 1rem',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            color: isActive(item.path) ? 'var(--primary-color)' : 'var(--text-secondary)',
                            backgroundColor: isActive(item.path) ? 'rgba(19, 127, 236, 0.1)' : 'transparent',
                            fontWeight: 500,
                            transition: 'all 0.2s'
                        }}
                    >
                        <span className="material-symbols-outlined" style={{ 
                            fontVariationSettings: isActive(item.path) ? "'FILL' 1" : "'FILL' 0" 
                        }}>{item.icon}</span>
                        <span>{item.label}</span>
                    </Link>
                ))}
            </nav>

            <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem', marginBottom: '0.5rem' }}>
                    <img 
                        src={`https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=random`} 
                        alt="User" 
                        style={{ width: '40px', height: '40px', borderRadius: '50%' }} 
                    />
                    <div style={{ overflow: 'hidden' }}>
                        <p style={{ fontSize: '0.9rem', fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.name || 'Usuario'}</p>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.email || 'user@example.com'}</p>
                    </div>
                </div>
                <button 
                    onClick={handleLogout}
                    style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem',
                        background: 'none',
                        border: 'none',
                        color: 'var(--danger-color)',
                        fontSize: '0.9rem',
                        cursor: 'pointer'
                    }}
                >
                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>logout</span>
                    Sign Out
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;