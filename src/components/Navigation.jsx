import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Icon from './Icon';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useLocale } from '../contexts/LocaleContext';

const Navigation = () => {
  const { authedUser, onLogout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { locale, toggleLocale, t } = useLocale();
  const navigate = useNavigate();

  const onLogoutHandler = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <header>
      <h1>
        <Link to="/">{t('appTitle')}</Link>
      </h1>
      {authedUser && (
        <nav className="navigation">
          <ul>
            <li>
              <NavLink to="/">{t('activeNotes')}</NavLink>
            </li>
            <li>
              <NavLink to="/archives">{t('archives')}</NavLink>
            </li>
          </ul>
        </nav>
      )}
      <div className="navigation__actions">
        <button
          className="toggle-theme"
          type="button"
          title={t('toggleTheme')}
          onClick={toggleTheme}
        >
          <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={28} />
        </button>
        <button
          className="toggle-locale"
          type="button"
          title={t('toggleLocale')}
          onClick={toggleLocale}
        >
          <Icon name="language" size={24} />
          <span className="toggle-locale__label">{locale.toUpperCase()}</span>
        </button>
        {authedUser && (
          <div className="navigation__user">
            <span className="navigation__user-name">{authedUser.name}</span>
            <button className="button-logout" type="button" onClick={onLogoutHandler}>
              <Icon name="logout" size={22} />
              <span>{t('logout')}</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;
