import React from 'react';

const PrivacyPage = () => {
    return (
        <div className="container" style={{ padding: '4rem 2rem' }}>
            <h1 style={{ marginBottom: '2rem' }}>Política de Privacidad</h1>
            <div className="card">
                <p>Tu privacidad es importante para nosotros.</p>
                <h3 style={{ marginTop: '1.5rem' }}>1. Recopilación de Datos</h3>
                <p>Recopilamos información básica como tu nombre y correo electrónico para proporcionar el servicio.</p>
                <h3 style={{ marginTop: '1.5rem' }}>2. Uso de Datos</h3>
                <p>No vendemos tus datos a terceros. Utilizamos la información para mejorar tu experiencia.</p>
            </div>
        </div>
    );
};

export default PrivacyPage;