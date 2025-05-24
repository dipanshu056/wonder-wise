import { createContext, useState, useEffect } from 'react';
import { login as loginApi, signup as signupApi } from '../api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ token });
    }
    setLoading(false);
  }, []);

  const signup = async (userData) => {
    try {
      const response = await signupApi(userData);
      const { token, userId } = response.data;
      localStorage.setItem('token', token);
      setUser({ token, userId });
      return response;
    } catch (error) {
      throw error;
    }
  };

  const login = async (credentials) => {
    try {
      const response = await loginApi(credentials);
      const { token, userId } = response.data;
      localStorage.setItem('token', token);
      setUser({ token, userId });
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};