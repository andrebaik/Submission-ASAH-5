import React from 'react';
import PropTypes from 'prop-types';
import NoteItem from './NoteItem';
import { noteShape } from '../utils/prop-types';

const NoteList = ({
  notes, emptyMessage, onDeleteNote, onArchiveNote, onUnarchiveNote,
}) => {
  if (notes.length === 0) {
    return (
      <div className="notes-list-empty">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="notes-list">
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          onDeleteNote={onDeleteNote}
          onArchiveNote={onArchiveNote}
          onUnarchiveNote={onUnarchiveNote}
        />
      ))}
    </div>
  );
};

NoteList.propTypes = {
  notes: PropTypes.arrayOf(noteShape).isRequired,
  emptyMessage: PropTypes.string,
  onDeleteNote: PropTypes.func,
  onArchiveNote: PropTypes.func,
  onUnarchiveNote: PropTypes.func,
};

NoteList.defaultProps = {
  emptyMessage: 'Tidak ada catatan',
  onDeleteNote: undefined,
  onArchiveNote: undefined,
  onUnarchiveNote: undefined,
};

export default NoteList;
