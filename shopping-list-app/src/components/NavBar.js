import React from 'react';
import './styles/NavBar.css';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';

function NavBar({ users, currentUser, onSelectUser }) {
    const { t } = useTranslation();
    return (
        <nav className="nav-bar">
            <select 
                value={currentUser ? currentUser.id : ""}
                onChange={e => {
                    const selectedUser = users.find(user => user.id === parseInt(e.target.value));
                    onSelectUser(selectedUser);
                }}
            >
                <option value="" disabled>{t("selectUser")}</option>
                {users.map(user => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                ))}
            </select>
            <div className="language-switcher">
                <LanguageSwitcher />
            </div>
        </nav>
    );
}

export default NavBar;
