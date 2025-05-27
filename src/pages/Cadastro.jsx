import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Cadastro = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [sucesso, setSucesso] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensagem('');

    // Debug: verificar os dados antes de enviar
    console.log('Dados do formulário:', { email, senha });
    console.log('Senha length:', senha.length);

    // Validação básica
    if (!email || !senha) {
      setMensagem('Por favor, preencha todos os campos.');
      setLoading(false);
      return;
    }

    if (senha.length < 6) {
      setMensagem('A senha deve ter pelo menos 6 caracteres.');
      setLoading(false);
      return;
    }

    try {
      // Preparar dados para envio - testando ambos os formatos
      const requestData = {
        email: email,
        senha: senha,
        password: senha  // Caso a API espere 'password' ao invés de 'senha'
      };

      console.log('Enviando dados:', requestData);

      const response = await fetch('https://65dc-2804-7f0-7d80-293a-59b7-a4a8-d7f6-8e11.ngrok-free.app/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true', // Header necessário para ngrok
        },
        body: JSON.stringify(requestData),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      // Verificar se a resposta é bem-sucedida (200-299)
      if (response.ok) {
        setSucesso(true);
        setMensagem('Cadastro realizado com sucesso!');
        console.log('Cadastro bem-sucedido');
      } else {
        // Tentar ler a resposta como JSON
        let errorMessage = 'Erro ao realizar cadastro. Tente novamente.';
        try {
          const data = await response.json();
          console.log('Error response:', data);
          errorMessage = data.message || data.error || errorMessage;
        } catch {
          // Se não conseguir parsear como JSON, tentar como texto
          const textResponse = await response.text();
          console.log('Error response (text):', textResponse);
          errorMessage = textResponse || errorMessage;
        }
        setMensagem(errorMessage);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      setMensagem('Erro de conexão. Verifique sua internet e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const voltar = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">Mind Desk</h1>
        
        {!sucesso ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  console.log('Email atualizado:', e.target.value);
                }}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="seu@email.com"
              />
            </div>
            
            <div>
              <label htmlFor="senha" className="block text-sm font-medium text-gray-700 mb-1">
                Senha
              </label>
              <input
                type="password"
                id="senha"
                name="senha"
                value={senha}
                onChange={(e) => {
                  setSenha(e.target.value);
                  console.log('Senha atualizada:', e.target.value);
                }}
                required
                minLength="6"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Mínimo 6 caracteres"
              />
              <small className="text-gray-500 text-xs mt-1">
                Senha atual: {senha.length} caracteres
              </small>
            </div>
            
            {mensagem && (
              <div className={`p-3 rounded-md text-sm ${
                mensagem.includes('sucesso') 
                  ? 'bg-green-100 text-green-700 border border-green-400' 
                  : 'bg-red-100 text-red-700 border border-red-400'
              }`}>
                {mensagem}
              </div>
            )}
            
            <button
              type="submit"
              disabled={loading || !email || !senha}
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              {loading ? 'Processando...' : 'Cadastrar'}
            </button>
          </form>
        ) : (
          <div className="text-center">
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {mensagem}
            </div>
            <a 
              href="/login" 
              className="text-blue-600 hover:text-blue-800 underline transition-colors"
            >
              Ir para o Login
            </a>
          </div>
        )}
        
        <div className="mt-6">
          <button
            onClick={voltar}
            className="w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors"
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;