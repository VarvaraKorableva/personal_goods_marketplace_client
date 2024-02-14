import React from "react";
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({
  isLoggin,
  redirectPath = '/signin',
  children,
}) => {

  if (!isLoggin) {
    console.log(isLoggin)
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default ProtectedRoute