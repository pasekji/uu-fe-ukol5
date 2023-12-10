import React from 'react';
import MemberItem from './MemberItem';
import './styles/Members.css';
import { useTranslation } from 'react-i18next';


function Members({ memberList, allUsers, listId, currentUser, onUpdateMembers }) {
    const { t } = useTranslation();
    const notMembers = allUsers.filter(user => !memberList.includes(user.id));

    const updateMembersOnServer = async (updatedMembers) => {
        try {
            const response = await fetch(`http://localhost:5000/api/shopping-lists/${listId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ members: updatedMembers }),
            });
            if (!response.ok) throw new Error('Network response was not ok');
            onUpdateMembers(updatedMembers);
        } catch (error) {
            console.error('Error updating members:', error);
        }
    };

    const handleAddMember = async (memberId) => {
        const updatedMembers = [...memberList, memberId];
        updateMembersOnServer(updatedMembers);
    };
    
    const handleRemoveMember = async (memberId) => {
        const updatedMembers = memberList.filter(id => id !== memberId);
        updateMembersOnServer(updatedMembers);
    };
    
    const handleLeaveList = async () => {
        const updatedMembers = memberList.filter(id => id !== currentUser.id);
        updateMembersOnServer(updatedMembers);
    };

    return (
        <div className="members-container">
            <h3>{t('membersHeading')}</h3>
            {memberList.map((memberId, index) => {
                const member = allUsers.find(user => user.id === memberId);
                return member ? (
                    <div key={index}>
                        <MemberItem member={member} />
                        {currentUser.id === listId && <button onClick={() => handleRemoveMember(memberId)}>{t('removeButton')}</button>}
                    </div>
                ) : null;
            })}
            {currentUser.id === listId && notMembers.map(user => (
                <button key={user.id} onClick={() => handleAddMember(user.id)}>{t('addButton', { name: user.name })}</button>
            ))}
            {memberList.includes(currentUser.id) && 
                <button onClick={handleLeaveList}>{t('leaveListButton')}</button>}
        </div>
    );
}

export default Members;
