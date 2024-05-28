import { sendMessage } from 'components/SendMessage';
import { onValue, push, ref, set } from 'firebase/database';
import { db } from 'firebaseConfig/firebase';
import { StateInterface } from 'interface';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './styled.css'

const Dialog = ({ conversation, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessageText, setNewMessageText] = useState('');
  
  const currentUserInfo = useSelector((state: StateInterface) => state.userInfo);
  
  useEffect(() => {
    if (currentUserInfo && conversation) {
      const messagesRef = ref(db, `message/usersWithMessage/${currentUserInfo.userId}/users/${conversation.id}`);
      onValue(messagesRef, (snapshot) => {
        const messagesData = snapshot.val();
        if (messagesData) {
          const messagesList = Object.keys(messagesData).map((messageId) => ({
            id: messageId,
            text: messagesData[messageId].text,
            sender: messagesData[messageId].sender,
            senderName: messagesData[messageId].senderName, // Используем имя отправителя из сообщения
            timestamp: messagesData[messageId].timestamp,
          }));
          setMessages(messagesList);
        }
      });
    }
  }, [conversation, currentUserInfo]);

  const handleSendMessage = () => {
    if (newMessageText.trim() === '') return;
    sendMessage(newMessageText, conversation.id, currentUserInfo.userId, conversation.name); // Передаем имя пользователя
    setNewMessageText('');
  };

  return (
    <div style={{ padding: '10px' }}>
      <h2>Dialog with {conversation.name}</h2>
      <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {messages.map((message) => (
          <div key={message.id} style={{ padding: '10px' }}>
            <b>{message.sender === currentUserInfo.userId ? 'You' : message.senderName}:</b> {message.text}
          </div>
        ))}
      </div>
      <textarea
        className="message-input"
        value={newMessageText}
        onChange={(e) => setNewMessageText(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={handleSendMessage} style={{ marginRight: '10px' }}>Send</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default Dialog;