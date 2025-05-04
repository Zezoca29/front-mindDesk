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

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });

      if (response.status === 200) {
        setSucesso(true);
        setMensagem('Cadastro realizado com sucesso!');
      } else {
        const data = await response.json();
        setMensagem(data.message || 'Erro ao realizar cadastro. Tente novamente.');
      }
    } catch (error) {
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
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="senha" className="block text-sm font-medium text-gray-700 mb-1">
                Senha
              </label>
              <input
                type="password"
                id="senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            {mensagem && (
              <p className="text-red-500 text-sm">{mensagem}</p>
            )}
            
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
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