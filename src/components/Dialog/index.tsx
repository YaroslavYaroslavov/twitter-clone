import { sendMessage } from 'components/SendMessage';
import { onValue, push, ref, set } from 'firebase/database';
import { db } from 'firebaseConfig/firebase';
import { StateInterface } from 'interface';
import React, { useEffect,useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const Dialog = ({ conversation, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessageText, setNewMessageText] = useState('');
  
  const currentUserInfo = useSelector((state: StateInterface) => state.userInfo);
  
  console.log(conversation);
  
  console.log(conversation?.id, currentUserInfo?.userId)

  useEffect(() => {
    if (currentUserInfo && conversation ) {
      const messagesRef = ref(db, `message/usersWithMessage/${currentUserInfo.userId}/users/${conversation.id}`); // история сообщ между пользователями т и в
      onValue(messagesRef, (snapshot) => {
        const messagesData = snapshot.val();
        if (messagesData) {
          const messagesList = Object.keys(messagesData).map((messageId) => ({
            id: messageId,
            text: messagesData[messageId].text,
            sender: messagesData[messageId].sender,
            timestamp: messagesData[messageId].timestamp,
          }));
          setMessages(messagesList);
        }
      });
    }
  }, [conversation, currentUserInfo]);

  const handleSendMessage = () => {
    if (newMessageText.trim() === '') return;
    sendMessage(newMessageText, conversation.id, currentUserInfo.userId); 
    
    setNewMessageText('');
  };

  // const handleSendMessage = () => {
  //   if (messageText.trim() !== '') {
  //     sendMessage(messageText, recipientUserId, senderUserId, senderName); 
  //     setMessageText('');
  //     setActive(false); 
  //   }
  // };

  return (
    <div style={{ padding: '10px' }}>
      <h2>Dialog with {conversation.name}</h2>
      <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {messages.map((message) => (
          <div key={message.id} style={{ padding: '10px' }}>
            <b>{message.sender === currentUserInfo.userId ? 'You' : conversation.name}:</b> {message.text}
          </div>
        ))}
      </div>
      <textarea
        value={newMessageText}
        onChange={(e) => setNewMessageText(e.target.value)}
        placeholder="Type a message..."
        style={{ width: '100%', marginBottom: '10px' }}
      />
      <button onClick={handleSendMessage} style={{ marginRight: '10px' }}>Send</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default Dialog;