import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="landing-page">
            {/* Hero Section */}
            <section style={{ 
                backgroundColor: '#4a90e2', 
                color: 'white', 
                padding: '4rem 2rem', 
                textAlign: 'center',
                borderRadius: '0 0 50% 50% / 4rem'
            }}>
                <div className="container">
                    <h1 style={{ fontSize: '3rem', marginBottom: '1rem', fontWeight: '800' }}>Control Total de tu Inventario</h1>
                    <p style={{ fontSize: '1.2rem', marginBottom: '2rem', opacity: '0.9' }}>
                        La solución SaaS definitiva para gestionar tus productos, stock y ventas de manera eficiente y segura.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <Link to="/register" className="btn" style={{ backgroundColor: 'white', color: '#4a90e2', padding: '1rem 2rem', fontSize: '1.1rem' }}>Comenzar Gratis</Link>
                        <Link to="/login" className="btn" style={{ border: '2px solid white', color: 'white', padding: '1rem 2rem', fontSize: '1.1rem', backgroundColor: 'transparent' }}>Iniciar Sesión</Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="container" style={{ padding: '4rem 2rem' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '3rem', color: '#2c3e50' }}>¿Por qué elegirnos?</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem', color: '#4a90e2' }}>🚀</div>
                        <h3>Rápido y Eficiente</h3>
                        <p style={{ color: '#7f8c8d' }}>Gestiona miles de productos sin latencia. Nuestra arquitectura optimizada garantiza velocidad.</p>
                    </div>
                    <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem', color: '#2ecc71' }}>🔒</div>
                        <h3>Seguridad Garantizada</h3>
                        <p style={{ color: '#7f8c8d' }}>Tus datos están protegidos con los más altos estándares de seguridad y encriptación.</p>
                    </div>
                    <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem', color: '#e74c3c' }}>📊</div>
                        <h3>Análisis en Tiempo Real</h3>
                        <p style={{ color: '#7f8c8d' }}>Visualiza el estado de tu stock al instante y toma decisiones informadas.</p>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section style={{ backgroundColor: '#f8f9fa', padding: '4rem 2rem' }}>
                <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <h2 style={{ marginBottom: '1.5rem', color: '#2c3e50' }}>Sobre Nosotros</h2>
                    <p style={{ maxWidth: '800px', color: '#7f8c8d', fontSize: '1.1rem', lineHeight: '1.8' }}>
                        SaaS de Inventario nació con la misión de simplificar la logística para pequeñas y medianas empresas. 
                        Creemos que la tecnología debe ser un aliado, no un obstáculo. Desarrollado con pasión y las mejores prácticas de ingeniería de software.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
