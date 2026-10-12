import React from 'react';
import NoteList from '../components/NoteList';
import Loading from '../components/Loading';
import { useArchivedNotes } from '../hooks/useNotes';
import { deleteNote, unarchiveNote } from '../utils/network-data';
import { useLocale } from '../contexts/LocaleContext';

const ArchivePage = () => {
  const { notes, loading, error, refetch } = useArchivedNotes();
  const { t } = useLocale();

  const onUnarchiveHandler = async (id) => {
    await unarchiveNote(id);
    refetch();
  };

  const onDeleteHandler = async (id) => {
    await deleteNote(id);
    refetch();
  };

  return (
    <section className="archives-page">
      <h2>{t('archivedNotesTitle')}</h2>
      {loading ? (
        <Loading />
      ) : (
        <>
          {error && <p className="error-message">{t('loadError')}</p>}
          <NoteList
            notes={notes}
            emptyMessage={t('noArchivedNotes')}
            onDeleteNote={onDeleteHandler}
            onUnarchiveNote={onUnarchiveHandler}
          />
        </>
      )}
    </section>
  );
};

export default ArchivePage;
