import React, {
  createContext, useContext, useEffect, useMemo, useState,
} from 'react';
import PropTypes from 'prop-types';
import strings from '../utils/strings';

const LocaleContext = createContext();

const getInitialLocale = () => localStorage.getItem('locale') || 'id';

const LocaleProvider = ({ children }) => {
  const [locale, setLocale] = useState(getInitialLocale);

  useEffect(() => {
    localStorage.setItem('locale', locale);
    document.documentElement.setAttribute('lang', locale);
  }, [locale]);

  const toggleLocale = () => {
    setLocale((prevLocale) => (prevLocale === 'id' ? 'en' : 'id'));
  };

  const value = useMemo(() => ({
    locale,
    toggleLocale,
    t: (key) => strings[locale][key] || key,
  }), [locale]);

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
};

LocaleProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useLocale = () => useContext(LocaleContext);

export { LocaleProvider, useLocale };
