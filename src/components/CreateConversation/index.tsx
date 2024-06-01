import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ref, push, set } from 'firebase/database';
import { db } from 'firebaseConfig/firebase';
import { StateInterface } from 'interface';
import { ButtonTweet } from 'components/Navbar/styled';

const CreateConversation = ({ onConversationCreated, availableUsers }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [conversationName, setConversationName] = useState('');
  const currentUserInfo = useSelector(state => state.userInfo);
  const users = useSelector((state: StateInterface) => state.users);

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
    if (selectedUsers.length > 0 && conversationName.trim() !== '') {
      const senderUserId = currentUserInfo.userId;

      const newConversationData = {
        name: conversationName,
        users: {},
      };

      const newConversationKey = push(ref(db, 'message/usersWithMessage/')).key;

      selectedUsers.forEach((user) => {
        const recipientUserId = user.id;
        const senderConversationRef = ref(db, `message/usersWithMessage/${senderUserId}/chats/${recipientUserId}/${newConversationKey}`);
        const recipientConversationRef = ref(db, `message/usersWithMessage/${recipientUserId}/chats/${senderUserId}/${newConversationKey}`);

        newConversationData.users[recipientUserId] = {
          lastMessage: '',
          sender: senderUserId,
          timestamp: Date.now(),
        };

        set(senderConversationRef, newConversationData)
          .then(() => {
            console.log('Conversation data written successfully for sender.');
            set(recipientConversationRef, newConversationData)
              .then(() => {
                console.log('Conversation data written successfully for recipient.');
                onConversationCreated(recipientUserId);
              })
              .catch((error) => {
                console.error('Error writing conversation data for recipient:', error);
              });
          })
          .catch((error) => {
            console.error('Error writing conversation data for sender:', error);
          });
      });
    }
  };

  const inputStyles = {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '14px',
  };

  return (
    <div>
      <input
        type="text"
        value={conversationName}
        onChange={(e) => setConversationName(e.target.value)}
        placeholder="Введите название чата"
        style={inputStyles}
      />
      <div>
        {availableUsers.map((user) => {
          const currentUser = users?.find((userr) => userr.userId === user.id);
          return (
            <div key={user.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', padding: '10px', borderBottom: '1px solid #ccc', cursor: 'pointer', backgroundColor: '#f8f8f8' }}>
              <input
                type="checkbox"
                checked={selectedUsers.some((selectedUser) => selectedUser.id === user.id)}
                onChange={() => handleUserSelect(user)}
                style={{ marginRight: '10px' }}
              />
              <img src={currentUser?.avatar} alt="Avatar" style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }} />
              <span style={{ fontWeight: 'bold' }}>{currentUser?.username}</span>
            </div>
          );
        })}
      </div>
      <ButtonTweet
        onClick={handleCreateConversation}
        disabled={selectedUsers.length === 0 || conversationName.trim() === ''}
        style={{ width: '150px', height: '40px', fontSize: '14px' }}
      >
        Создать чат
      </ButtonTweet>
    </div>
  );
};

export default CreateConversation;