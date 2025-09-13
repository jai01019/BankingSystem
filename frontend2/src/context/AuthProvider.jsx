// src/context/AuthProvider.jsx
import React, { useState, useEffect } from "react";
import AuthContext from "./AuthContext"; // import the default
import { getUser, getToken, saveAuthData, removeToken } from "../utils/auth";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    const userData = getUser();
    if (token && userData) {
      setUser(userData);
    }
    setLoading(false);
  }, []);

  const login = (token, userData) => {
    saveAuthData(token, userData);
    setUser(userData);
  };

  const logout = () => {
    removeToken();
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isCustomer: user?.role === "customer",
    isBanker: user?.role === "banker",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
