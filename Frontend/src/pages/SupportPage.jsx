import React from 'react';

const SupportPage = () => {
    return (
        <div className="container" style={{ padding: '4rem 2rem' }}>
            <h1 style={{ marginBottom: '2rem' }}>Soporte Técnico</h1>
            <div className="card">
                <p>¿Necesitas ayuda? Estamos aquí para asistirte.</p>
                <h3 style={{ marginTop: '1.5rem' }}>Contacto</h3>
                <p>Envíanos un correo a <a href="mailto:soporte@saasinventario.com" style={{ color: '#4a90e2' }}>soporte@saasinventario.com</a></p>
                <h3 style={{ marginTop: '1.5rem' }}>Horario de Atención</h3>
                <p>Lunes a Viernes: 9:00 AM - 6:00 PM</p>
            </div>
        </div>
    );
};

export default SupportPage;