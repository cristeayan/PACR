import React, { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const setUserAndToken = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', userToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  useEffect(() => {
    try {
      const savedUser = JSON.parse(localStorage.getItem('user'));
      const savedToken = localStorage.getItem('token');
      if (savedUser && savedToken) {
        setUser(savedUser);
        setToken(savedToken);
        console.log("User and token loaded from localStorage");
      }
    } catch (error) {
      console.error("Error loading user or token from localStorage:", error);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, token, setUserAndToken, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
