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
      console.log('Tentando fazer login...');
      const result = await login(email, password);
      
      if (result.success) {
        console.log('Login realizado com sucesso!');
        
        // Pequeno delay para garantir que o estado foi atualizado
        setTimeout(() => {
          window.location.href = '/mind-desk';
        }, 100);
        
        return result;
      }
    } catch (err) {
      console.error('Erro no login:', err);
      
      let errorMessage = 'Erro ao fazer login. Tente novamente.';
      
      // Tratamento específico de erros
      if (err.message.includes('Credenciais inválidas') || 
          err.message.includes('Email ou senha') ||
          err.message.includes('Invalid credentials')) {
        errorMessage = 'Email ou senha incorretos. Verifique suas credenciais.';
      } else if (err.message.includes('Token não recebido')) {
        errorMessage = 'Erro no servidor. Tente novamente em alguns instantes.';
      } else if (err.message.includes('Servidor retornou resposta inválida') ||
                 err.message.includes('Unexpected token')) {
        errorMessage = 'Erro de comunicação com o servidor. Verifique sua conexão.';
      } else if (err.message.includes('Failed to fetch') || 
                 err.message.includes('Network Error')) {
        errorMessage = 'Erro de conexão. Verifique sua internet e tente novamente.';
      } else if (err.message.includes('Não foi possível obter dados do usuário')) {
        // Este erro não deve mais impedir o login
        console.warn('Dados do usuário não foram carregados, mas login foi bem-sucedido');
        setTimeout(() => {
          window.location.href = '/mind-desk';
        }, 100);
        return;
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