import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token === 'mock_token_secret') {
      setUser({ role: 'admin', name: 'Balaji' });
    }
    setLoading(false);
  }, []);

  const login = (username, password) => {
    if (username === 'admin@gmail.com' && password === 'admin@321') {
      localStorage.setItem('admin_token', 'mock_token_secret');
      setUser({ role: 'admin', name: 'Balaji' });
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
