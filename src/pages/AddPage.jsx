import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NoteInput from '../components/NoteInput';
import { addNote } from '../utils/network-data';
import { useLocale } from '../contexts/LocaleContext';

const AddPage = () => {
  const [submitting, setSubmitting] = useState(false);
  const { t } = useLocale();
  const navigate = useNavigate();

  const onAddHandler = async ({ title, body }) => {
    setSubmitting(true);
    const { error } = await addNote({ title, body });
    setSubmitting(false);
    if (!error) {
      navigate('/');
    }
  };

  return (
    <section className="add-new-page">
      <h2>{t('addNoteTitle')}</h2>
      <NoteInput onSubmit={onAddHandler} submitting={submitting} />
    </section>
  );
};

export default AddPage;
