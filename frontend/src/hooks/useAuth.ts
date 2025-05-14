import { useState, useEffect } from 'react';
import apiClient from '../services/apiClient';

// ✅ Import types with type-only syntax
import type { AuthState } from '../types/auth.types';
import type { AuthError } from '../types/auth.types'; // 👈 Now exists

export const useAuth = () => {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
  });

  // Check if token exists on load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setState(prev => ({ ...prev, token, user: { email: 'test@example.com' } }));
    }
  }, []);

  const signup = async (email: string, name: string, password: string) => {
    setState({ ...state, loading: true, error: null });

    try {
      await apiClient.post('/auth/signup', { email, name, password });
      return true;
    } catch (err: unknown) {
      const error = err as AuthError; // ✅ Now works
      const errorMessage =
        error?.response?.data?.message ||
        'Registration failed';

      setState({
        ...state,
        loading: false,
        error: errorMessage,
      });

      return false;
    }
  };

  const signin = async (email: string, password: string) => {
    setState({ ...state, loading: true, error: null });

    try {
      const res = await apiClient.post('/auth/signin', { email, password });
      const { token } = res.data;

      localStorage.setItem('token', token);
      setState({
        ...state,
        loading: false,
        token,
        user: { email },
        error: null,
      });

      return true;
    } catch (err: unknown) {
      const error = err as AuthError;
      const errorMessage =
        error?.response?.data?.message ||
        'Invalid credentials';

      setState({
        ...state,
        loading: false,
        error: errorMessage,
      });

      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setState({
      ...state,
      user: null,
      token: null,
      error: null,
    });
  };

  const clearError = () => {
    setState({ ...state, error: null });
  };

  return {
    ...state,
    signup,
    signin,
    logout,
    clearError,
  };
};