import React, { useState } from 'react';
import ShoppingItem from './ShoppingItem';
import './styles/Items.css';
import { useTranslation } from 'react-i18next';

function Items({ itemList, currentUser, listOwner, listMembers, onUpdateItems, listId  }) {
    const [items, setItems] = useState(itemList);
    const [newItem, setNewItem] = useState({ name: '', amount: '', unit: '', solved: false });
    const [showUnresolved, setShowUnresolved] = useState(true);
    const displayedItems = showUnresolved ? items : items.filter(item => !item.solved);

    const { t } = useTranslation();

    const handleSolvedChange = async (changedItem) => {
        if (currentUser.id === listOwner || listMembers.includes(currentUser.id)) {
            const updatedItems = items.map(item =>
                item === changedItem ? { ...item, solved: !item.solved } : item
            );

            try {
                const response = await fetch(`http://localhost:5000/api/shopping-lists/${listId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ items: updatedItems }),
                });
                if (!response.ok) throw new Error('Network response was not ok');
                setItems(updatedItems);
            } catch (error) {
                console.error('Error updating item solved status:', error);
            }
        }
    };

    const handleAddItem = async () => {
        if (newItem.name) {
            const updatedItems = [...items, newItem];
            try {
                const response = await fetch(`http://localhost:5000/api/shopping-lists/${listId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ items: updatedItems }),
                });
                if (!response.ok) throw new Error('Network response was not ok');
                setItems(updatedItems);
                setNewItem({ name: '', amount: '', unit: '', solved: false });
            } catch (error) {
                console.error('Error updating items:', error);
            }
        }
    };

    const handleRemoveItem = async (itemToRemove) => {
        const updatedItems = items.filter(item => item !== itemToRemove);

        try {
            const response = await fetch(`http://localhost:5000/api/shopping-lists/${listId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items: updatedItems }),
            });
            if (!response.ok) throw new Error('Network response was not ok');
            setItems(updatedItems);
        } catch (error) {
            console.error('Error removing item:', error);
        }
    };  

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewItem(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="items-container">
            <div>
                <h3>{t('itemsHeading')}</h3>
                <div>
                    <button onClick={() => setShowUnresolved(true)}>{t('showAllButton')}</button>
                    <button onClick={() => setShowUnresolved(false)}>{t('showUnresolvedButton')}</button>
                </div>
            </div>
            {displayedItems.map((item, index) => (
                <ShoppingItem key={index} item={item} onSolvedChange={handleSolvedChange} onRemove={handleRemoveItem} />
            ))}
            <div className="add-item-form">
                <input 
                    type="text" 
                    name="name"
                    placeholder={t('itemNamePlaceholder')}
                    value={newItem.name}
                    onChange={handleInputChange}
                />
                <input 
                    type="text" 
                    name="amount"
                    placeholder={t('amountPlaceholder')}
                    value={newItem.amount}
                    onChange={handleInputChange}
                />
                <input 
                    type="text" 
                    name="unit"
                    placeholder={t('unitPlaceholder')}
                    value={newItem.unit}
                    onChange={handleInputChange}
                />
                <button onClick={handleAddItem}>{t('addItemButton')}</button>
            </div>
        </div>
    );
}

export default Items;
