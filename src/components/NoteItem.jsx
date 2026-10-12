import React from 'react';
import { Link } from 'react-router-dom';
import parser from 'html-react-parser';
import PropTypes from 'prop-types';
import { showFormattedDate } from '../utils';
import { noteShape } from '../utils/prop-types';
import { useLocale } from '../contexts/LocaleContext';

const NoteItem = ({
  note, onDeleteNote, onArchiveNote, onUnarchiveNote,
}) => {
  const { locale, t } = useLocale();
  const {
    id, title, body, createdAt,
  } = note;

  return (
    <article className="note-item">
      <h3 className="note-item__title">
        <Link to={`/notes/${id}`}>{title}</Link>
      </h3>
      <p className="note-item__createdAt">{showFormattedDate(createdAt, locale)}</p>
      <div className="note-item__body">{parser(body)}</div>
      <div className="note-item__actions">
        {onArchiveNote && (
          <button className="btn" type="button" onClick={() => onArchiveNote(id)}>
            {t('archive')}
          </button>
        )}
        {onUnarchiveNote && (
          <button className="btn" type="button" onClick={() => onUnarchiveNote(id)}>
            {t('unarchive')}
          </button>
        )}
        {onDeleteNote && (
          <button className="btn" type="button" onClick={() => onDeleteNote(id)}>
            {t('delete')}
          </button>
        )}
      </div>
    </article>
  );
};

NoteItem.propTypes = {
  note: noteShape.isRequired,
  onDeleteNote: PropTypes.func,
  onArchiveNote: PropTypes.func,
  onUnarchiveNote: PropTypes.func,
};

NoteItem.defaultProps = {
  onDeleteNote: undefined,
  onArchiveNote: undefined,
  onUnarchiveNote: undefined,
};

export default NoteItem;
