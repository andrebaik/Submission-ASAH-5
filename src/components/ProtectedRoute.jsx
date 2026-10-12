import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { authedUser, initializing } = useAuth();

  if (initializing) {
    return <Loading fullHeight />;
  }

  if (!authedUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
