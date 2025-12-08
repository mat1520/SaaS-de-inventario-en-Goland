import React, { useState } from 'react';

const Header = ({ title }) => {
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState([
        { id: 1, text: 'Low stock alert: Wireless Mouse', time: '2 min ago', read: false },
        { id: 2, text: 'New order received #1234', time: '1 hour ago', read: false },
        { id: 3, text: 'System update completed', time: '5 hours ago', read: true },
    ]);

    const unreadCount = notifications.filter(n => !n.read).length;

    const handleNotificationClick = () => {
        setShowNotifications(!showNotifications);
    };

    const markAsRead = (id) => {
        setNotifications(notifications.map(n => 
            n.id === id ? { ...n, read: true } : n
        ));
    };

    const clearAll = () => {
        setNotifications([]);
        setShowNotifications(false);
    };

    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '2rem' 
        }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-color)' }}>{title}</h1>
            
            <div style={{ position: 'relative' }}>
                <button 
                    onClick={handleNotificationClick}
                    style={{ 
                        position: 'relative', 
                        padding: '0.5rem', 
                        borderRadius: '50%', 
                        border: 'none', 
                        background: 'transparent', 
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <span className="material-symbols-outlined" style={{ color: 'var(--text-secondary)' }}>notifications</span>
                    {unreadCount > 0 && (
                        <span style={{ 
                            position: 'absolute', 
                            top: '6px', 
                            right: '6px', 
                            width: '10px', 
                            height: '10px', 
                            borderRadius: '50%', 
                            backgroundColor: 'var(--danger-color)', 
                            border: '2px solid var(--card-bg)' 
                        }}></span>
                    )}
                </button>

                {showNotifications && (
                    <div style={{
                        position: 'absolute',
                        top: '100%',
                        right: 0,
                        width: '320px',
                        backgroundColor: '#fff',
                        borderRadius: '12px',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                        border: '1px solid var(--border-color)',
                        zIndex: 1000,
                        overflow: 'hidden'
                    }}>
                        <div style={{ 
                            padding: '1rem', 
                            borderBottom: '1px solid var(--border-color)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <h3 style={{ fontSize: '0.95rem', fontWeight: '600' }}>Notifications</h3>
                            <button 
                                onClick={clearAll}
                                style={{ 
                                    border: 'none', 
                                    background: 'none', 
                                    color: 'var(--primary-color)', 
                                    fontSize: '0.8rem', 
                                    cursor: 'pointer',
                                    fontWeight: '500'
                                }}
                            >
                                Clear all
                            </button>
                        </div>
                        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                            {notifications.length === 0 ? (
                                <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                    No notifications
                                </div>
                            ) : (
                                notifications.map(notification => (
                                    <div 
                                        key={notification.id}
                                        onClick={() => markAsRead(notification.id)}
                                        style={{ 
                                            padding: '1rem', 
                                            borderBottom: '1px solid var(--border-color)',
                                            backgroundColor: notification.read ? '#fff' : 'rgba(19, 127, 236, 0.05)',
                                            cursor: 'pointer',
                                            transition: 'background-color 0.2s'
                                        }}
                                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = notification.read ? '#fff' : 'rgba(19, 127, 236, 0.05)'}
                                    >
                                        <p style={{ fontSize: '0.9rem', marginBottom: '0.25rem', color: 'var(--text-color)' }}>{notification.text}</p>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{notification.time}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
