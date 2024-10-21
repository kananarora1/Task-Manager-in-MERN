import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from './context/usercontext';

const ProtectedRoute = ({ element }) => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <p>Loading...</p>;  
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return element;
};

export default ProtectedRoute;
