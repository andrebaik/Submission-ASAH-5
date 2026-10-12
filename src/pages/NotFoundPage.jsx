import React from 'react';
import { Link } from 'react-router-dom';
import { useLocale } from '../contexts/LocaleContext';

const NotFoundPage = () => {
  const { t } = useLocale();

  return (
    <section className="not-found-page">
      <h2>{t('pageNotFoundTitle')}</h2>
      <p>{t('pageNotFoundMessage')}</p>
      <Link className="not-found-page__link" to="/">{t('backHome')}</Link>
    </section>
  );
};

export default NotFoundPage;
