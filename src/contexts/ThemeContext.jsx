import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const ThemeContext = createContext();

const getInitialTheme = () => localStorage.getItem('theme') || 'dark';

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useTheme = () => useContext(ThemeContext);

export { ThemeProvider, useTheme };
