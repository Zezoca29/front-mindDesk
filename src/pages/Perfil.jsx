import React from 'react';

const perfilData = {
    nome: 'João Silva',
    email: 'joao.silva@email.com',
    cargo: 'Desenvolvedor Frontend',
    telefone: '(11) 99999-9999',
    empresa: 'Zez Technology',
};

function Perfil() {
    return (
        <div style={{ maxWidth: 400, margin: '40px auto', padding: 24, border: '1px solid #eee', borderRadius: 8 }}>
            <h2>Perfil do Usuário</h2>
            <div>
                <strong>Nome:</strong> {perfilData.nome}
            </div>
            <div>
                <strong>Email:</strong> {perfilData.email}
            </div>
            <div>
                <strong>Cargo:</strong> {perfilData.cargo}
            </div>
            <div>
                <strong>Telefone:</strong> {perfilData.telefone}
            </div>
            <div>
                <strong>Empresa:</strong> {perfilData.empresa}
            </div>
        </div>
    );
}

export default Perfil;