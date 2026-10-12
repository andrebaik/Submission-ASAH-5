import React from 'react';
import PropTypes from 'prop-types';
import { useLocale } from '../contexts/LocaleContext';

const Loading = ({ fullHeight }) => {
  const { t } = useLocale();

  return (
    <div className={`loading${fullHeight ? ' loading--full' : ''}`}>
      <span className="loading__spinner" />
      <p className="loading__text">{t('loading')}</p>
    </div>
  );
};

Loading.propTypes = {
  fullHeight: PropTypes.bool,
};

Loading.defaultProps = {
  fullHeight: false,
};

export default Loading;
