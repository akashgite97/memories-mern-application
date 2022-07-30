import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PrivateRoute({ children }) {
  const isAuthenticated = JSON.parse(localStorage.getItem ("profile"));
  

  if (!isAuthenticated) {
    // not logged in so redirect to login page
    return <Navigate to="/auth" />;
  }
  return children;
}

export default PrivateRoute;
