import React from 'react';
import { useTranslation } from 'react-i18next';
import './styles/AppHeader.css';

function AppHeader({ logoSrc }) {
  const { t } = useTranslation();

  return (
    <header className="app-header">
      {logoSrc && <img src={logoSrc} alt="App Logo" />}
      <h1>{t('appTitle')}</h1>
    </header>
  );
}

export default AppHeader;
