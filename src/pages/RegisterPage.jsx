import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import useInput from '../hooks/useInput';
import { register } from '../utils/network-data';
import { useLocale } from '../contexts/LocaleContext';

const RegisterPage = () => {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [confirmPassword, onConfirmPasswordChange] = useInput('');
  const [errorMessage, setErrorMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { t } = useLocale();
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setErrorMessage('');

    if (password !== confirmPassword) {
      setErrorMessage(t('passwordNotMatch'));
      return;
    }

    setSubmitting(true);
    const { error } = await register({ name, email, password });
    setSubmitting(false);

    if (!error) {
      navigate('/login');
    }
  };

  return (
    <section className="auth-page">
      <h2>{t('registerTitle')}</h2>
      <form className="input-register" onSubmit={onSubmitHandler}>
        <InputField
          id="name"
          label={t('name')}
          type="text"
          value={name}
          onChange={onNameChange}
        />
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
        <InputField
          id="confirmPassword"
          label={t('confirmPassword')}
          type="password"
          value={confirmPassword}
          onChange={onConfirmPasswordChange}
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit" disabled={submitting}>
          {submitting ? t('loading') : t('registerButton')}
        </button>
      </form>
      <p className="auth-page__switch">
        {t('haveAccount')}
        {' '}
        <Link to="/login">{t('loginHere')}</Link>
      </p>
    </section>
  );
};

export default RegisterPage;
