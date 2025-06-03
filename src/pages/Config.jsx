import React, { useState, useEffect } from 'react';

const Config = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        theme: 'light',
    });

    useEffect(() => {
        // Simulação de fetch dos dados do usuário
        const fetchUser = async () => {
            // Aqui você pode substituir por uma chamada real de API
            const userData = {
                name: 'Usuário Exemplo',
                email: 'usuario@exemplo.com',
                theme: 'light',
            };
            setUser(userData);
        };
        fetchUser();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aqui você pode enviar os dados atualizados para a API
        alert('Configurações salvas!');
    };

    return (
        <div style={{ maxWidth: 400, margin: '0 auto', padding: 24 }}>
            <h2>Configurações do Usuário</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome:</label>
                    <input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        style={{ width: '100%', marginBottom: 12 }}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        style={{ width: '100%', marginBottom: 12 }}
                    />
                </div>
                <div>
                    <label>Tema:</label>
                    <select
                        name="theme"
                        value={user.theme}
                        onChange={handleChange}
                        style={{ width: '100%', marginBottom: 12 }}
                    >
                        <option value="light">Claro</option>
                        <option value="dark">Escuro</option>
                    </select>
                </div>
                <button type="submit">Salvar</button>
            </form>
        </div>
    );
};

export default Config;