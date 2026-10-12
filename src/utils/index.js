const showFormattedDate = (date, locale = 'id') => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const language = locale === 'en' ? 'en-US' : 'id-ID';
  return new Date(date).toLocaleDateString(language, options);
};

export { showFormattedDate };
