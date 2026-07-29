import React, { createContext, useState, useEffect } from "react";
import api from "../services/Api.js";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

const extractRoles = (decoded) => {
  const rawRole = decoded?.role;
  if (!rawRole) return [];
  return Array.isArray(rawRole) ? rawRole : [rawRole];
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);

        // Verifica se o token não expirou
        const now = Date.now() / 1000;
        if (decoded.exp && decoded.exp < now) {
          localStorage.removeItem("token");
          setLoading(false);
          return;
        }

        api.defaults.headers.Authorization = `Bearer ${token}`;

        const roles = extractRoles(decoded);
        const role = roles.includes("Admin") ? "Admin" : "public";

        setUser({ token, role, roles, email: decoded.unique_name });
      } catch (e) {
        localStorage.removeItem("token");
      }
    }

    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    const { token } = response.data;

    localStorage.setItem("token", token);
    api.defaults.headers.Authorization = `Bearer ${token}`;

    const decoded = jwtDecode(token);
    const roles = extractRoles(decoded);
    const role = roles.includes("Admin") ? "Admin" : "public";

    setUser({ token, role, roles, email: response.data.email });
  };

  const logout = () => {
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = undefined;
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      signed: !!user,
      user,
      login,
      logout,
      loading,
      hasRole: (r) => user?.roles?.includes(r) || false
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
