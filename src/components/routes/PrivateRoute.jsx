import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { signed, loading, user } = useContext(AuthContext);

  if (loading) return <div>Carregando...</div>;

  if (!signed || user?.role !== "Admin") {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
