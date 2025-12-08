import React, { useState, useEffect, useContext } from 'react';
import UserService from '../services/userService';
import { AuthContext } from '../context/AuthContext';
import Header from '../components/Header';

const ProfilePage = () => {
    const { user, updateUser } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [message, setMessage] = useState({ type: '', text: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const data = await UserService.getProfile();
            setFormData(prev => ({
                ...prev,
                name: data.name,
                email: data.email
            }));
        } catch (error) {
            console.error("Error loading profile", error);
            setMessage({ type: 'error', text: 'Failed to load profile data.' });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        setMessage({ type: '', text: '' });
        
        // Validation
        if (!formData.name.trim()) {
            setMessage({ type: 'error', text: 'Name cannot be empty.' });
            return;
        }
        if (/\d/.test(formData.name)) {
            setMessage({ type: 'error', text: 'Name cannot contain numbers.' });
            return;
        }
        if (!formData.email.trim()) {
            setMessage({ type: 'error', text: 'Email cannot be empty.' });
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setMessage({ type: 'error', text: 'Invalid email format.' });
            return;
        }

        if (formData.newPassword) {
            if (formData.newPassword.length < 6) {
                setMessage({ type: 'error', text: 'Password must be at least 6 characters.' });
                return;
            }
            if (formData.newPassword !== formData.confirmPassword) {
                setMessage({ type: 'error', text: 'New passwords do not match.' });
                return;
            }
        }

        setLoading(true);
        try {
            const payload = {
                name: formData.name,
                email: formData.email
            };
            
            // Only include password if user wants to change it
            if (formData.newPassword) {
                payload.password = formData.newPassword;
            }

            const response = await UserService.updateProfile(payload);
            
            if (response.user) {
                updateUser(response.user);
            }

            setMessage({ type: 'success', text: 'Profile updated successfully.' });
            setFormData(prev => ({ 
                ...prev, 
                currentPassword: '', 
                newPassword: '', 
                confirmPassword: '' 
            }));
        } catch (error) {
            console.error("Error updating profile", error);
            setMessage({ type: 'error', text: 'Failed to update profile.' });
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = {
        width: '100%',
        padding: '0.75rem 1rem',
        borderRadius: '0.5rem',
        border: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-color)',
        color: 'var(--text-color)',
        fontSize: '0.95rem',
        outline: 'none',
        transition: 'border-color 0.2s, box-shadow 0.2s'
    };

    const labelStyle = {
        display: 'block',
        fontSize: '0.875rem',
        fontWeight: '500',
        color: 'var(--text-secondary)',
        marginBottom: '0.5rem'
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Header */}
            <header style={{ 
                position: 'sticky', 
                top: 0, 
                zIndex: 10, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                padding: '1rem 1.5rem', 
                borderBottom: '1px solid var(--border-color)', 
                backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                backdropFilter: 'blur(4px)'
            }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-color)' }}>User Profile</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button style={{ 
                        position: 'relative', 
                        padding: '0.5rem', 
                        borderRadius: '50%', 
                        border: 'none', 
                        background: 'transparent', 
                        cursor: 'pointer' 
                    }}>
                        <span className="material-symbols-outlined" style={{ color: 'var(--text-secondary)' }}>notifications</span>
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
                    </button>
                    <button 
                        onClick={handleSubmit}
                        disabled={loading}
                        style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            height: '40px', 
                            padding: '0 1rem', 
                            backgroundColor: 'var(--primary-color)', 
                            color: 'white', 
                            fontSize: '0.875rem', 
                            fontWeight: 'bold', 
                            borderRadius: '0.5rem', 
                            border: 'none', 
                            cursor: loading ? 'not-allowed' : 'pointer',
                            opacity: loading ? 0.7 : 1
                        }}
                    >
                        {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main style={{ padding: '1.5rem', flex: 1, overflowY: 'auto' }}>
                <div style={{ maxWidth: '56rem', margin: '0 auto' }}>
                    
                    {message.text && (
                        <div style={{ 
                            padding: '1rem', 
                            marginBottom: '1.5rem', 
                            borderRadius: '0.5rem', 
                            backgroundColor: message.type === 'error' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(34, 197, 94, 0.1)', 
                            color: message.type === 'error' ? '#ef4444' : '#15803d',
                            border: `1px solid ${message.type === 'error' ? '#ef4444' : '#22c55e'}`
                        }}>
                            {message.text}
                        </div>
                    )}

                    <div style={{ 
                        padding: '1.5rem', 
                        borderRadius: '0.75rem', 
                        border: '1px solid var(--border-color)', 
                        backgroundColor: 'var(--card-bg)', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: '2rem' 
                    }}>
                        
                        {/* User Settings Section */}
                        <div>
                            <h2 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--text-color)' }}>User Settings</h2>
                            <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                <img 
                                    src={`https://ui-avatars.com/api/?name=${formData.name || 'User'}&background=random&size=128`} 
                                    alt="User avatar" 
                                    style={{ width: '96px', height: '96px', borderRadius: '50%', objectFit: 'cover' }} 
                                />
                            </div>
                        </div>

                        <div style={{ borderTop: '1px solid var(--border-color)', margin: '0 -1.5rem' }}></div>

                        {/* Personal Information Section */}
                        <div>
                            <h2 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--text-color)' }}>Personal Information</h2>
                            <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                                <div>
                                    <label htmlFor="name" style={labelStyle}>Full Name</label>
                                    <input 
                                        id="name" 
                                        name="name" 
                                        type="text" 
                                        value={formData.name} 
                                        onChange={handleChange} 
                                        style={inputStyle} 
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" style={labelStyle}>Email Address</label>
                                    <input 
                                        id="email" 
                                        name="email" 
                                        type="email" 
                                        value={formData.email} 
                                        onChange={handleChange} 
                                        style={inputStyle} 
                                    />
                                </div>
                            </div>
                        </div>

                        <div style={{ borderTop: '1px solid var(--border-color)', margin: '0 -1.5rem' }}></div>

                        {/* Update Password Section */}
                        <div>
                            <h2 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--text-color)' }}>Update Password</h2>
                            <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                                <div>
                                    <label htmlFor="currentPassword" style={labelStyle}>Current Password</label>
                                    <input 
                                        id="currentPassword" 
                                        name="currentPassword" 
                                        type="password" 
                                        placeholder="Enter current password" 
                                        value={formData.currentPassword} 
                                        onChange={handleChange} 
                                        style={inputStyle} 
                                    />
                                </div>
                                <div></div> {/* Spacer for grid */}
                                <div>
                                    <label htmlFor="newPassword" style={labelStyle}>New Password</label>
                                    <input 
                                        id="newPassword" 
                                        name="newPassword" 
                                        type="password" 
                                        placeholder="Enter new password" 
                                        value={formData.newPassword} 
                                        onChange={handleChange} 
                                        style={inputStyle} 
                                    />
                                </div>
                                <div>
                                    <label htmlFor="confirmPassword" style={labelStyle}>Confirm New Password</label>
                                    <input 
                                        id="confirmPassword" 
                                        name="confirmPassword" 
                                        type="password" 
                                        placeholder="Confirm new password" 
                                        value={formData.confirmPassword} 
                                        onChange={handleChange} 
                                        style={inputStyle} 
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProfilePage;
