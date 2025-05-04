import { useState } from 'react';
import './style.css';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (response.status === 200) {
        const data = await response.json();
        
        // Armazenar token no cache do servidor
        sessionStorage.setItem('authToken', data.token);
        
        // Verificar se o token está no cache
        const cachedToken = sessionStorage.getItem('authToken');
        
        if (cachedToken) {
          // Redirecionar para a página principal
          window.location.href = '/mind-desk';
        } else {
          setError('Falha ao armazenar credenciais. Tente novamente.');
        }
      } else {
        setError('Credenciais inválidas. Verifique seu email e senha.');
      }
    } catch (err) {
      setError('Erro ao conectar com o servidor. Tente novamente mais tarde.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-600">Mind Desk</h1>
          <p className="mt-2 text-gray-600">Entre com suas credenciais</p>
        </div>
        
        {error && (
          <div className="p-3 text-sm text-white bg-red-500 rounded-md">
            {error}
          </div>
        )}
        
        <div className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="seu@email.com"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
              />
            </div>
          </div>
          
          <div>
            <button
              onClick={handleLogin}
              disabled={loading}
              className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {loading ? 'Processando...' : 'Entrar'}
            </button>
          </div>
        </div>
        
        <div className="text-center mt-4">
          <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
            Esqueceu sua senha?
          </a>
        </div>
      </div>
      
      <div className="mt-8 text-center text-sm text-gray-600">
        <p>© 2025 Mind Desk. Todos os direitos reservados.</p>
      </div>
    </div>
  );
};

export default Login;