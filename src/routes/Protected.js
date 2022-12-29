import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../components/Loading/Loading';
import { AuthenticationContext } from '../context/Authentication';

function Protected({ children }) {
  const { user, loading } = useContext(AuthenticationContext);

  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (user?.uid) {
    return children;
  }
  return <Navigate to="/sign-in" state={{ from: location }} replace />;
}

export default Protected;
