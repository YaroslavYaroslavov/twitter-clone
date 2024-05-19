import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ref, onValue } from 'firebase/database';
import { db } from 'firebaseConfig/firebase';
import Dialog from 'components/Dialog';
import { sendMessage } from 'components/SendMessage';

const Messages = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);

  //Redux хранилище
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

  console.log(conversations);
  
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', padding: '10px', border: '1px solid #ccc', marginTop: '20px' }}>
      <div style={{ padding: '10px', marginRight: '10px', borderRight: '1px solid #ccc', overflowY: 'auto', height: 'calc(100vh - 100px)' }}>
        {conversations.map((conversation) => {
          console.log(conversation);
          
          return (
        <div key={conversation.id} onClick={() => handleConversationClick(conversation)} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px', cursor: 'pointer', backgroundColor: '#f8f8f8' }}>
          <h2>{conversation.name}</h2>
          <p>{conversation.lastMessage}</p>
        </div>)} )}

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