import React from 'react';
import './styles/ShoppingItem.css';
import { useTranslation } from 'react-i18next';


function ShoppingItem({ item, onSolvedChange, onRemove }) {
    const { t } = useTranslation();

    return (
        <div className="shopping-item">
            <input 
                type="checkbox" 
                checked={item.solved} 
                onChange={() => onSolvedChange(item)} 
            />
            {item.amount} {item.unit} {item.name}
            <button onClick={() => onRemove(item)}>{t('removeButton')}</button>
        </div>
    );
}

export default ShoppingItem;
