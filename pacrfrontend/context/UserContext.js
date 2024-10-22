import React, { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchUserAndToken = () => {
      const user = JSON.parse(localStorage.getItem('user'));  // Get user from localStorage
      const token = localStorage.getItem('token');  // Get token from localStorage

      setUser(user);
      setToken(token);
    };

    fetchUserAndToken();
  }, []);

  return (
    <UserContext.Provider value={{ user, token }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
