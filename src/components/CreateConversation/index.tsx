import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ref, push } from 'firebase/database';
import { db } from 'firebaseConfig/firebase';

const CreateConversation = ({ onConversationCreated, availableUsers }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const currentUserInfo = useSelector(state => state.userInfo);

  const handleUserSelect = (user) => {
    setSelectedUsers((prevSelectedUsers) => {
      const isUserSelected = prevSelectedUsers.some((selectedUser) => selectedUser.id === user.id);
      if (isUserSelected) {
        return prevSelectedUsers.filter((selectedUser) => selectedUser.id !== user.id);
      } else {
        return [...prevSelectedUsers, user];
      }
    });
  };

  const handleCreateConversation = () => {
    const newConversationRef = push(ref(db, 'message/usersWithMessage'), {
      users: selectedUsers.reduce((acc, user) => {
        acc[user.id] = {
          name: user.username,
          lastMessage: '',
        };
        return acc;
      }, { [currentUserInfo.userId]: { name: currentUserInfo.username, lastMessage: '' } }),
    });

    onConversationCreated(newConversationRef.key);
  };

  return (
    <div>
      <h2>Создать беседу</h2>
      <div>
        {availableUsers.map((user) => (
          <div key={user.id}>
            <input
              type="checkbox"
              checked={selectedUsers.some((selectedUser) => selectedUser.id === user.id)}
              onChange={() => handleUserSelect(user)}
            />
            <img src={user.avatar} alt="Avatar" style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }} />
            <span>{user.username}</span>
          </div>
        ))}
      </div>
      <button onClick={handleCreateConversation} disabled={selectedUsers.length === 0}>Создать беседу</button>
    </div>
  );
};

export default CreateConversation;