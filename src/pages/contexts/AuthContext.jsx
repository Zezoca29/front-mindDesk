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
      const storedToken = sessionStorage.getItem('authToken');
      
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
            sessionStorage.removeItem('authToken');
          }
        } catch (error) {
          console.error('Erro ao validar token:', error);
          sessionStorage.removeItem('authToken');
        }
      }
      
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Função para buscar dados do usuário
  const fetchUserData = async (authToken) => {
    try {
      const response = await fetch('https://d04c-2804-7f0-7d80-1e00-2491-dda2-15dd-573d.ngrok-free.app/api/user/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data.user;
      }
      
      return null;
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
      return null;
    }
  };

  // Função principal de login
const login = async (email, password) => {
  try {
    const loginResponse = await fetch('https://d04c-2804-7f0-7d80-1e00-2491-dda2-15dd-573d.ngrok-free.app/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!loginResponse.ok) {
      const errorData = await loginResponse.json();
      throw new Error(errorData.message || 'Credenciais inválidas');
    }

    const loginData = await loginResponse.json();
    console.log('Resposta do login:', loginData); // <-- Adicione este log

    const authToken = loginData.token;
    if (!authToken) {
      throw new Error('Token não recebido do servidor');
    }

    // Teste a chamada manualmente se necessário
    const userData = await fetchUserData(authToken);
    if (!userData) {
      throw new Error('Não foi possível obter dados do usuário');
    }

    setToken(authToken);
    setUser(userData);
    setIsAuthenticated(true);
    sessionStorage.setItem('authToken', authToken);

    return {
      success: true,
      user: userData,
      token: authToken
    };

  } catch (error) {
    console.error('Erro no login:', error);
    throw error;
  }
};

  // Função de logout
  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    sessionStorage.removeItem('authToken');
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