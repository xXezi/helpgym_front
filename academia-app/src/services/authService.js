import api from './api';

const login = async (email, senha) => {
  try {
    const response = await api.post('/auth/login', { email, senha });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

const register = async (nome, email, senha) => {
  try {
    const response = await api.post('/auth/register', { nome, email, senha });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) return JSON.parse(userStr);
  return null;
};

const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

const authService = {
  login,
  register,
  logout,
  getCurrentUser,
  isAuthenticated
};

export default authService;
