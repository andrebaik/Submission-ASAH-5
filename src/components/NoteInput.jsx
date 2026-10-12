import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';
import useInput from '../hooks/useInput';
import { useLocale } from '../contexts/LocaleContext';

const NoteInput = ({ onSubmit, submitting }) => {
  const { t } = useLocale();
  const [title, onTitleChange] = useInput('');
  const bodyRef = useRef(null);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    onSubmit({
      title,
      body: bodyRef.current ? bodyRef.current.innerHTML : '',
    });
  };

  return (
    <form className="add-new-page__input" onSubmit={onSubmitHandler}>
      <input
        type="text"
        className="add-new-page__input__title"
        placeholder={t('titlePlaceholder')}
        value={title}
        onChange={onTitleChange}
      />
      <div
        className="add-new-page__input__body"
        data-placeholder={t('bodyPlaceholder')}
        contentEditable
        ref={bodyRef}
      />
      <div className="add-new-page__action">
        <button className="action" type="submit" title={t('save')} disabled={submitting}>
          <Icon name="check" />
        </button>
      </div>
    </form>
  );
};

NoteInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
};

NoteInput.defaultProps = {
  submitting: false,
};

export default NoteInput;
