import React from 'react';

const Estatisticas = () => {
    return (
        <div style={{ padding: '2rem' }}>
            <h1>Estatísticas</h1>
            <div style={{
                marginTop: '2rem',
                padding: '1rem',
                border: '1px solid #ddd',
                borderRadius: '8px',
                background: '#fafafa'
            }}>
                <h2>Resumo</h2>
                <ul>
                    <li>Total de usuários: 0</li>
                    <li>Total de acessos: 0</li>
                    <li>Atividades recentes: Nenhuma</li>
                </ul>
            </div>
        </div>
    );
};

export default Estatisticas;