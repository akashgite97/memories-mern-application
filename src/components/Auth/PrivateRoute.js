import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { user } from "../../util";

function PrivateRoute({ children }) {
  if (!user.result) {
    // not logged in so redirect to login page
    return <Navigate to="/auth" />;
  }
  return children;
}

export default PrivateRoute;
