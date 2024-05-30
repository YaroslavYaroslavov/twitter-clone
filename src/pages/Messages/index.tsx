import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ref, onValue } from 'firebase/database';
import { db } from 'firebaseConfig/firebase';
import Dialog from 'components/Dialog';
import { sendMessage } from 'components/SendMessage';

const Messages = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [interlocutors, setInterlocutors] = useState({}); // Состояние для хранения информации о собеседниках

  const currentUserInfo = useSelector(state => state.userInfo);

  useEffect(() => {
    if (currentUserInfo && currentUserInfo.userId) {
      const messagesRef = ref(db, `message/usersWithMessage/${currentUserInfo.userId}/users`);
      onValue(messagesRef, (snapshot) => {
        const conversationsData = snapshot.val();
        if (conversationsData) {
          const conversationsList = Object.keys(conversationsData).map((userId) => ({
            id: userId,
            name: conversationsData[userId].name,
            lastMessage: conversationsData[userId].lastMessage,
          }));
          setConversations(conversationsList);

          // Загрузка информации о собеседниках
          const newInterlocutors = {};
          conversationsList.forEach((conversation) => {
            const interlocutorRef = ref(db, `users/${conversation.id}`);
            onValue(interlocutorRef, (snapshot) => {
              const interlocutorData = snapshot.val();
              newInterlocutors[conversation.id] = interlocutorData;
              setInterlocutors(newInterlocutors);
            });
          });
        }
      });
    }
  }, [currentUserInfo]);

  const handleConversationClick = (conversation) => {
    setSelectedConversation(conversation);
  };

  const handleDialogClose = () => {
    setSelectedConversation(null);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', padding: '10px', border: '1px solid #ccc', borderRadius: '10px', marginTop: '20px' }}>
      <div style={{ padding: '5px', marginRight: '10px', borderRight: '1px solid #ccc', overflowY: 'auto', height: 'calc(100vh - 100px)' }}>
        {conversations.map((conversation) => {
          const interlocutorInfo = interlocutors[conversation.id];
          return (
            <div key={conversation.id} onClick={() => handleConversationClick(conversation)} style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px', marginBottom: '10px', cursor: 'pointer', backgroundColor: '#f8f8f8', display: 'flex', alignItems: 'center' }}>
              {interlocutorInfo && (
                <>
                  <img src={interlocutorInfo.avatar} alt="Avatar" style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }} />
                  <div>
                    <h2 style={{ margin: 0, fontSize: '16px' }}>{interlocutorInfo.username}</h2>
                    <p style={{ margin: 0, fontSize: '14px' }}>{conversation.lastMessage}</p>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
      <div style={{ padding: '10px' }}>
        {selectedConversation && (
          <Dialog
            conversation={selectedConversation}
            onClose={handleDialogClose}
          />
        )}
      </div>
    </div>
  );
};

export default Messages;