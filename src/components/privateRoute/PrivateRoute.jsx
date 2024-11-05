import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

// Route Guard Component
const PrivateRoute = ({ children, isAuthenticated }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" />;
  let decodedToken = jwtDecode(token);
  // console.log("Decoded Token", decodedToken);
  let currentDate = new Date();

  // JWT exp is in seconds
  // console.log(decodedToken.exp);
  if (decodedToken.exp * 1000 < currentDate.getTime()) {
    // console.log("Token expired.");
    localStorage.removeItem("token");
    return <Navigate to="/login" />;
  }

  // If authenticated, render the children components (protected routes)
  return children;
};

export default PrivateRoute;
