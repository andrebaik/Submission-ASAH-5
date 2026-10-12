import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import parser from 'html-react-parser';
import Icon from '../components/Icon';
import Loading from '../components/Loading';
import useNote from '../hooks/useNote';
import { showFormattedDate } from '../utils';
import {
  archiveNote, deleteNote, unarchiveNote,
} from '../utils/network-data';
import { useLocale } from '../contexts/LocaleContext';

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    note, loading, error, refetch,
  } = useNote(id);
  const { locale, t } = useLocale();

  const onDeleteHandler = async () => {
    await deleteNote(id);
    navigate('/');
  };

  const onArchiveHandler = async () => {
    if (note.archived) {
      await unarchiveNote(id);
    } else {
      await archiveNote(id);
    }
    refetch();
  };

  if (loading) {
    return <Loading fullHeight />;
  }

  if (error || !note) {
    return (
      <section className="detail-page">
        <h2 className="detail-page__title">{t('notFoundTitle')}</h2>
        <p>{t('notFoundMessage')}</p>
      </section>
    );
  }

  return (
    <section className="detail-page">
      <h2 className="detail-page__title">{note.title}</h2>
      <p className="detail-page__createdAt">{showFormattedDate(note.createdAt, locale)}</p>
      <div className="detail-page__body">{parser(note.body)}</div>
      <div className="detail-page__action">
        <button
          className="action"
          type="button"
          title={note.archived ? t('unarchive') : t('archive')}
          onClick={onArchiveHandler}
        >
          <Icon name={note.archived ? 'unarchive' : 'archive'} />
        </button>
        <button
          className="action"
          type="button"
          title={t('delete')}
          onClick={onDeleteHandler}
        >
          <Icon name="trash" />
        </button>
      </div>
    </section>
  );
};

export default DetailPage;
