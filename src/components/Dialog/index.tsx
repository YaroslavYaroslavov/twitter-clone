import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ref, onValue } from 'firebase/database';
import { db } from 'firebaseConfig/firebase';
import { StateInterface } from 'interface';
import { sendMessage } from 'components/SendMessage';
import { Link } from 'react-router-dom';
import './styled.css';

const Dialog = ({ conversation, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessageText, setNewMessageText] = useState('');
  const currentUserInfo = useSelector((state: StateInterface) => state.userInfo);
  const [interlocutorInfo, setInterlocutorInfo] = useState(null);

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
            timestamp: messagesData[messageId].timestamp,
          }));
          setMessages(messagesList);
        }
      });

      const interlocutorRef = ref(db, `users/${conversation.id}`);
      onValue(interlocutorRef, (snapshot) => {
        const interlocutorData = snapshot.val();
        setInterlocutorInfo(interlocutorData);
      });
    }
  }, [conversation, currentUserInfo]);

  const handleSendMessage = () => {
    if (newMessageText.trim() === '') return;
    sendMessage(newMessageText, conversation.id, currentUserInfo.userId);
    setNewMessageText('');
  };

  return (
 <div className="dialog-container">
    <h2>Dialog with {interlocutorInfo ? interlocutorInfo.username : 'Loading...'}</h2>
    <div className="messages-container">
      {messages.map((message) => (
        <div key={message.id} className={`message-item ${message.sender === currentUserInfo.userId ? 'mine' : 'theirs'}`}>
          <div className="avatar-link">
            {message.sender === currentUserInfo.userId ? (
              <Link to={`/profile/${currentUserInfo.userlink}`}>
                <img
                  src={currentUserInfo.avatar}
                  alt="Avatar"
                  className="avatar"
                />
              </Link>
            ) : (
              <Link to={`/profile/${interlocutorInfo.userlink}`}>
                <img
                  src={interlocutorInfo.avatar}
                  alt="Avatar"
                  className="avatar"
                />
              </Link>
            )}
            <div className="username">
              {message.sender === currentUserInfo.userId ? currentUserInfo.username : interlocutorInfo.username}
            </div>
          </div>
          <div className="message-content">
            {message.text}
          </div>
        </div>
      ))}
    </div>
    <div className="input-container">
      <textarea
        className="message-input"
        value={newMessageText}
        onChange={(e) => setNewMessageText(e.target.value)}
        placeholder="Type a message..."
      />
      <div className="button-container">
        <button className="send-button" onClick={handleSendMessage}>Send</button>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  </div>
);
};

export default Dialog;