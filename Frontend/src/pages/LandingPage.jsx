import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="landing-page">
            {/* Hero Section */}
            <section style={{ 
                background: 'linear-gradient(135deg, #2c3e50 0%, #4a90e2 100%)', 
                color: 'white', 
                padding: '6rem 2rem', 
                textAlign: 'center',
            }}>
                <div className="container">
                    <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', fontWeight: '800', letterSpacing: '-1px' }}>
                        Gestión de Inventario Simplificada
                    </h1>
                    <p style={{ fontSize: '1.25rem', marginBottom: '3rem', opacity: '0.9', maxWidth: '700px', margin: '0 auto 3rem auto', lineHeight: '1.6' }}>
                        Optimiza tu negocio con nuestra plataforma SaaS. Controla stock, visualiza métricas y escala sin límites.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <Link to="/register" className="btn" style={{ backgroundColor: 'white', color: '#2c3e50', padding: '1rem 2.5rem', fontSize: '1.1rem', fontWeight: 'bold' }}>Comenzar Gratis</Link>
                        <Link to="/login" className="btn" style={{ border: '2px solid rgba(255,255,255,0.3)', color: 'white', padding: '1rem 2.5rem', fontSize: '1.1rem', backgroundColor: 'transparent' }}>Iniciar Sesión</Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="container" style={{ padding: '6rem 2rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-color)', marginBottom: '1rem' }}>Todo lo que necesitas</h2>
                    <p style={{ color: 'var(--text-color)', fontSize: '1.1rem', opacity: 0.7 }}>Herramientas potentes para hacer crecer tu negocio.</p>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
                    <div className="card" style={{ padding: '2.5rem', borderTop: '4px solid #4a90e2' }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-color)' }}>Dashboard Intuitivo</h3>
                        <p style={{ color: 'var(--text-color)', lineHeight: '1.6', opacity: 0.7 }}>Visualiza el rendimiento de tu inventario con gráficos claros y métricas en tiempo real.</p>
                    </div>
                    <div className="card" style={{ padding: '2.5rem', borderTop: '4px solid #2ecc71' }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-color)' }}>Control de Stock</h3>
                        <p style={{ color: 'var(--text-color)', lineHeight: '1.6', opacity: 0.7 }}>Mantén tu inventario actualizado, recibe alertas de stock bajo y evita pérdidas.</p>
                    </div>
                    <div className="card" style={{ padding: '2.5rem', borderTop: '4px solid #e74c3c' }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-color)' }}>Seguridad Enterprise</h3>
                        <p style={{ color: 'var(--text-color)', lineHeight: '1.6', opacity: 0.7 }}>Tus datos están encriptados y seguros. Nos tomamos la privacidad muy en serio.</p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section style={{ backgroundColor: 'var(--secondary-color)', padding: '6rem 2rem', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--text-color)' }}>¿Listo para empezar?</h2>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-color)', marginBottom: '2.5rem', opacity: 0.7 }}>Únete a miles de empresas que ya confían en nosotros.</p>
                    <Link to="/register" className="btn btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.2rem' }}>Crear Cuenta Gratis</Link>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
