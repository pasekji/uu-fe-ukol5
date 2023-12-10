import React from 'react';
import './styles/ShoppingListPreview.css';
import { useTranslation } from 'react-i18next';


function ShoppingListPreview({ list, onSelect, onArchiveToggle, onDelete, currentUserId }) {
    const { t } = useTranslation();

    const handleArchiveToggle = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/shopping-lists/${list.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ archived: !list.archived }),
            });
            if (!response.ok) throw new Error('Network response was not ok');
            onArchiveToggle(list.id);
        } catch (error) {
            console.error('Failed to toggle archive:', error);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/shopping-lists/${list.id}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Network response was not ok');
            onDelete(list.id);
        } catch (error) {
            console.error('Failed to delete list:', error);
        }
    };

    return (
        <div className="shopping-list-preview">
            <h2>{list.listName}</h2>
            <p>{list.items.length} {t('itemsTotal')}</p>
            <p>{list.items.filter(item => item.solved).length} {t('itemsSolved')}</p>
            <button onClick={() => onSelect(list)}>{t('viewDetailButton')}</button>
            <button onClick={handleArchiveToggle}>
                {list.archived ? t('unarchiveButton') : t('archiveButton')}
            </button>
            {list.owner === currentUserId && (
                <button onClick={handleDelete}>{t('deleteButton')}</button>
            )}
        </div>
    );
}

export default ShoppingListPreview;
