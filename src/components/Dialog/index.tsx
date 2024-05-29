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
    <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', height: '90vh' }}>
      <h2>Dialog with {interlocutorInfo ? interlocutorInfo.username : 'Loading...'}</h2>
      <div style={{ flexGrow: 1, overflowY: 'auto', padding: '10px', marginBottom: '10px', marginTop: '10px', border: '1px solid #ccc', borderRadius: '4px' }}>
        {messages.map((message) => (
          <div key={message.id} style={{ display: 'flex', alignItems: 'flex-start', padding: '10px' }}>
            {message.sender === currentUserInfo.userId ? (
              <Link to={`/profile/${currentUserInfo.userlink}`} style={{ textDecoration: 'none', color: 'inherit', marginRight: '10px' }}>
                <img
                  src={currentUserInfo.avatar}
                  alt="Avatar"
                  style={{ width: '30px', height: '30px', borderRadius: '50%' }}
                />
              </Link>
            ) : (
              <Link to={`/profile/${interlocutorInfo.userlink}`} style={{ textDecoration: 'none', color: 'inherit', marginRight: '10px' }}>
                <img
                  src={interlocutorInfo.avatar}
                  alt="Avatar"
                  style={{ width: '30px', height: '30px', borderRadius: '50%' }}
                />
              </Link>
            )}
            <div>
              {message.sender === currentUserInfo.userId ? (
                <b>{currentUserInfo.username}:</b>
              ) : (
                <b>{interlocutorInfo.username}:</b>
              )}
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', padding: '10px', borderTop: '1px solid #ccc' }}>
        <textarea
          className="message-input"
          value={newMessageText}
          onChange={(e) => setNewMessageText(e.target.value)}
          placeholder="Type a message..."
          style={{ marginBottom: '10px', padding: '10px', flexGrow: 0, resize: 'none' }}
        />
        <div style={{ display: 'flex'}}>
          <button onClick={handleSendMessage} style={{ marginRight: '10px' }}>Send</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default Dialog;