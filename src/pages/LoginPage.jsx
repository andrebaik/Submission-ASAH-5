import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import useInput from '../hooks/useInput';
import { useAuth } from '../contexts/AuthContext';
import { useLocale } from '../contexts/LocaleContext';

const LoginPage = () => {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [submitting, setSubmitting] = useState(false);
  const { onLogin } = useAuth();
  const { t } = useLocale();
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    const { error } = await onLogin({ email, password });
    setSubmitting(false);
    if (!error) {
      navigate('/');
    }
  };

  return (
    <section className="auth-page">
      <h2>{t('loginTitle')}</h2>
      <form className="input-login" onSubmit={onSubmitHandler}>
        <InputField
          id="email"
          label={t('email')}
          type="email"
          value={email}
          onChange={onEmailChange}
        />
        <InputField
          id="password"
          label={t('password')}
          type="password"
          value={password}
          onChange={onPasswordChange}
        />
        <button type="submit" disabled={submitting}>
          {submitting ? t('loading') : t('loginButton')}
        </button>
      </form>
      <p className="auth-page__switch">
        {t('noAccount')}
        {' '}
        <Link to="/register">{t('registerHere')}</Link>
      </p>
    </section>
  );
};

export default LoginPage;
