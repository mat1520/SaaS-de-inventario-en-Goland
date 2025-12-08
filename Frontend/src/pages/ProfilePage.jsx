import React, { useState, useEffect, useContext } from 'react';
import UserService from '../services/userService';
import { AuthContext } from '../context/AuthContext';

const ProfilePage = () => {
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const { user } = useContext(AuthContext);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const data = await UserService.getProfile();
            setProfile(prev => ({ ...prev, name: data.name, email: data.email }));
        } catch (error) {
            console.error("Error cargando perfil", error);
            setError('No se pudo cargar la información del perfil.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            const payload = {
                name: profile.name,
                email: profile.email
            };
            if (profile.password) {
                payload.password = profile.password;
            }

            await UserService.updateProfile(payload);
            setMessage('Perfil actualizado correctamente');
            setProfile(prev => ({ ...prev, password: '' }));
        } catch (error) {
            console.error("Error actualizando perfil", error);
            setError('Error al actualizar perfil');
        }
    };

    return (
        <div className="container" style={{ maxWidth: '500px' }}>
            <div className="card">
                <h2 style={{ marginBottom: '1.5rem' }}>Mi Perfil</h2>
                {message && <div className="alert" style={{ backgroundColor: '#d4edda', color: '#155724' }}>{message}</div>}
                {error && <div className="alert alert-error">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Nombre:</label>
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            value={profile.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Email:</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            value={profile.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Nueva Contraseña (opcional):</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            value={profile.password}
                            onChange={handleChange}
                            placeholder="Dejar en blanco para mantener la actual"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Actualizar</button>
                </form>
            </div>
        </div>
    );
};

export default ProfilePage;
