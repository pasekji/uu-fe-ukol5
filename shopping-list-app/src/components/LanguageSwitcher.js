import React from 'react';
import i18n from 'i18next';

function LanguageSwitcher() {
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <select onChange={(e) => changeLanguage(e.target.value)}>
      <option value="en">English</option>
      <option value="cs">Čeština</option>
    </select>
  );
}

export default LanguageSwitcher;
