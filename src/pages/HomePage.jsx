import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import NoteList from '../components/NoteList';
import Loading from '../components/Loading';
import Icon from '../components/Icon';
import { useActiveNotes } from '../hooks/useNotes';
import { archiveNote, deleteNote } from '../utils/network-data';
import { useLocale } from '../contexts/LocaleContext';

const HomePage = () => {
  const { notes, loading, error, refetch } = useActiveNotes();
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useLocale();
  const keyword = searchParams.get('keyword') || '';

  const filteredNotes = notes.filter((note) => (
    note.title.toLowerCase().includes(keyword.toLowerCase())
  ));

  const onKeywordChangeHandler = (newKeyword) => {
    setSearchParams(newKeyword ? { keyword: newKeyword } : {});
  };

  const onArchiveHandler = async (id) => {
    await archiveNote(id);
    refetch();
  };

  const onDeleteHandler = async (id) => {
    await deleteNote(id);
    refetch();
  };

  return (
    <section className="homepage">
      <h2>{t('activeNotesTitle')}</h2>
      <SearchBar
        keyword={keyword}
        onKeywordChange={onKeywordChangeHandler}
        placeholder={t('searchPlaceholder')}
      />
      {loading ? (
        <Loading />
      ) : (
        <>
          {error && <p className="error-message">{t('loadError')}</p>}
          <NoteList
            notes={filteredNotes}
            emptyMessage={t('noActiveNotes')}
            onDeleteNote={onDeleteHandler}
            onArchiveNote={onArchiveHandler}
          />
        </>
      )}
      <div className="homepage__action">
        <Link className="action" to="/notes/new" title={t('addNote')}>
          <Icon name="plus" />
        </Link>
      </div>
    </section>
  );
};

export default HomePage;
