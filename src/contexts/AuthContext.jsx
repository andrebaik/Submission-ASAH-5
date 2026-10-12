import React, {
  createContext, useContext, useEffect, useMemo, useState,
} from 'react';
import PropTypes from 'prop-types';
import {
  getAccessToken,
  getUserLogged,
  login,
  putAccessToken,
} from '../utils/network-data';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authedUser, setAuthedUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      if (getAccessToken()) {
        const { error, data } = await getUserLogged();
        if (error) {
          localStorage.removeItem('accessToken');
        } else {
          setAuthedUser(data);
        }
      }
      setInitializing(false);
    };

    initAuth();
  }, []);

  const onLogin = async ({ email, password }) => {
    const { error, data } = await login({ email, password });
    if (error) {
      return { error: true };
    }

    putAccessToken(data.accessToken);

    const { error: userError, data: user } = await getUserLogged();
    if (userError) {
      localStorage.removeItem('accessToken');
      return { error: true };
    }

    setAuthedUser(user);
    return { error: false };
  };

  const onLogout = () => {
    localStorage.removeItem('accessToken');
    setAuthedUser(null);
  };

  const value = useMemo(() => ({
    authedUser,
    initializing,
    onLogin,
    onLogout,
  }), [authedUser, initializing]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
