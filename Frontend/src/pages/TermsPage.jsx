import React from 'react';

const TermsPage = () => {
    return (
        <div className="container" style={{ padding: '4rem 2rem' }}>
            <h1 style={{ marginBottom: '2rem' }}>Términos y Condiciones</h1>
            <div className="card">
                <p>Bienvenido a SaaS de Inventario. Al usar nuestro servicio, aceptas estos términos.</p>
                <h3 style={{ marginTop: '1.5rem' }}>1. Uso del Servicio</h3>
                <p>El servicio se proporciona "tal cual". Nos reservamos el derecho de modificar o suspender el servicio en cualquier momento.</p>
                <h3 style={{ marginTop: '1.5rem' }}>2. Cuentas de Usuario</h3>
                <p>Eres responsable de mantener la seguridad de tu cuenta y contraseña.</p>
            </div>
        </div>
    );
};

export default TermsPage;