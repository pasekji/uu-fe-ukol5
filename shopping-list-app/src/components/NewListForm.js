import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function NewListForm({ onCreate }) {
  const [listName, setListName] = useState('');
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({ listName, items: [], archived: false });
    setListName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={listName}
        onChange={(e) => setListName(e.target.value)}
        placeholder={t('listNamePlaceholder')}
        required
      />
      <button type="submit">{t('createListButton')}</button>
    </form>
  );
}

export default NewListForm;
