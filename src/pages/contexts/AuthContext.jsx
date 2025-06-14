// contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verificar se existe token ao carregar a aplicação
  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('authToken'); // Mudança para localStorage
      
      if (storedToken) {
        try {
          // Validar token e buscar dados do usuário
          const userData = await fetchUserData(storedToken);
          if (userData) {
            setToken(storedToken);
            setUser(userData);
            setIsAuthenticated(true);
          } else {
            // Token inválido, limpar storage
            localStorage.removeItem('authToken');
          }
        } catch (error) {
          console.error('Erro ao validar token:', error);
          localStorage.removeItem('authToken');
        }
      }
      
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Função para buscar dados do usuário
  const fetchUserData = async (authToken) => {
    try {
      console.log('Fazendo requisição para /api/user/me com token:', authToken?.substring(0, 20) + '...');
      
      const response = await fetch('https://5309-2804-7f0-7d80-b2b-e8d1-857e-64e8-784e.ngrok-free.app/api/user/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true', // Para evitar warnings do ngrok
        },
      });

      console.log('Status da resposta:', response.status);
      console.log('Headers da resposta:', Object.fromEntries(response.headers.entries()));

      // Verificar se a resposta é JSON antes de tentar fazer parse
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const textResponse = await response.text();
        console.error('Resposta não é JSON:', textResponse);
        throw new Error('Servidor retornou resposta inválida (não JSON)');
      }

      if (response.ok) {
        const data = await response.json();
        console.log('Dados do usuário recebidos:', data);
        return data.user;
      } else {
        const errorData = await response.json();
        console.error('Erro na resposta:', errorData);
        throw new Error(errorData.message || 'Erro ao buscar dados do usuário');
      }
      
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
      
      // Se for erro de JSON, mostrar mais detalhes
      if (error.message.includes('Unexpected token')) {
        console.error('A API retornou HTML em vez de JSON. Verifique se a URL está correta e o servidor está funcionando.');
      }
      
      return null;
    }
  };

  // Função principal de login
  const login = async (email, password) => {
    try {
      console.log('Iniciando processo de login...');
      
      const loginResponse = await fetch('https://5309-2804-7f0-7d80-b2b-e8d1-857e-64e8-784e.ngrok-free.app/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
        body: JSON.stringify({ email, password }),
      });

      console.log('Status do login:', loginResponse.status);

      if (!loginResponse.ok) {
        const errorData = await loginResponse.json();
        throw new Error(errorData.message || 'Credenciais inválidas');
      }

      const loginData = await loginResponse.json();
      console.log('Resposta do login:', loginData);

      const authToken = loginData.token;
      if (!authToken) {
        throw new Error('Token não recebido do servidor');
      }

      // Salvar token imediatamente após login bem-sucedido
      localStorage.setItem('authToken', authToken);
      setToken(authToken);

      // Usar os dados do usuário que já vieram no login, se disponíveis
      if (loginData.user) {
        console.log('Usando dados do usuário do login:', loginData.user);
        setUser(loginData.user);
        setIsAuthenticated(true);
        
        return {
          success: true,
          user: loginData.user,
          token: authToken
        };
      }

      // Se não vieram os dados do usuário no login, buscar separadamente
      console.log('Buscando dados do usuário separadamente...');
      const userData = await fetchUserData(authToken);
      
      if (!userData) {
        // Se não conseguir buscar dados do usuário, pelo menos manter o login
        console.warn('Não foi possível buscar dados do usuário, mas login foi bem-sucedido');
        setIsAuthenticated(true);
        
        return {
          success: true,
          user: null,
          token: authToken
        };
      }

      setUser(userData);
      setIsAuthenticated(true);

      return {
        success: true,
        user: userData,
        token: authToken
      };

    } catch (error) {
      console.error('Erro no login:', error);
      // Limpar storage em caso de erro
      localStorage.removeItem('authToken');
      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
      throw error;
    }
  };

  // Função de logout
  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem('authToken'); // Mudança para localStorage
  };

  // Função para atualizar dados do usuário
  const updateUser = (userData) => {
    setUser(userData);
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated,
    login,
    logout,
    updateUser,
    fetchUserData
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};