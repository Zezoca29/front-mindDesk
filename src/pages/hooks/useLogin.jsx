import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleLogin = async (email, password) => {
    setLoading(true);
    setError('');

    try {
      const result = await login(email, password);
      
      if (result.success) {
        // Redirecionar para a página principal
        window.location.href = '/mind-desk';
        return result;
      }
    } catch (err) {
      let errorMessage = 'Erro ao fazer login. Tente novamente.';
      
      if (err.message.includes('Credenciais inválidas') || err.message.includes('Email ou senha')) {
        errorMessage = 'Email ou senha incorretos. Verifique suas credenciais.';
      } else if (err.message.includes('servidor') || err.message.includes('rede')) {
        errorMessage = 'Erro de conexão. Verifique sua internet e tente novamente.';
      }
      
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    handleLogin,
    loading,
    error,
    setError
  };
};
