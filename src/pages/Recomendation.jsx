import React from 'react';

function Recommendation() {
    return (
        <div style={{
            maxWidth: '600px',
            margin: '40px auto',
            padding: '32px',
            background: '#fff',
            borderRadius: '12px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.08)'
        }}>
            <h1 style={{ color: '#2D3748', marginBottom: '16px' }}>Recomendações</h1>
            <p style={{ color: '#4A5568', fontSize: '18px' }}>
                Aqui você encontrará recomendações personalizadas para melhorar sua experiência.
            </p>
            <ul style={{ marginTop: '24px', color: '#2B6CB0' }}>
                <li>Explore novos recursos da plataforma</li>
                <li>Participe de treinamentos online</li>
                <li>Conecte-se com outros usuários</li>
            </ul>
        </div>
    );
}

export default Recommendation;