import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/provider/AuthProvider";

const PrivateRoutes = ({ children }) => {
  const { authState } = useAuth();
  const location = useLocation();

  return authState.loggedIn ? (
    children
  ) : (
    <Navigate to={"/auth"} state={{ from: location }} replace />
  );
};

export default PrivateRoutes;
