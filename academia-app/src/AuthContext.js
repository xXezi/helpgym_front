// src/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState(null); // Armazena o ID do usuário

  // Carrega o estado de autenticação do localStorage ao iniciar
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUserName = localStorage.getItem('userName');
    const storedUserId = localStorage.getItem('userId');
    if (storedToken && storedUserName && storedUserId) {
      setIsLoggedIn(true);
      setUserName(storedUserName);
      setUserId(storedUserId); // Carrega o ID
    }
  }, []);

  const login = (token, name, id) => { // Recebe o nome e ID
    setIsLoggedIn(true);
    setUserName(name);
    setUserId(id);       // Salva o ID
    localStorage.setItem('token', token);
    localStorage.setItem('userName', name);
    localStorage.setItem('userId', id); // Salva no localStorage
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserName('');
    setUserId(null); // Limpa o ID
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId'); // Limpa do localStorage
  };

  const contextValue = {
    isLoggedIn,
    userName,
    userId, // Expõe o ID
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para facilitar o acesso ao contexto
export const useAuth = () => useContext(AuthContext);