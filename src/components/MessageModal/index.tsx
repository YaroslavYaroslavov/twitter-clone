import React, { useState } from 'react';
import { Modal } from 'components/Modal';
import { sendMessage } from 'components/SendMessage'; 

export const MessageModal = ({ active, setActive, recipientUserId, senderUserId}) => {
  const [messageText, setMessageText] = useState('');

  const handleSendMessage = () => {
    if (messageText.trim() !== '') {
      sendMessage(messageText, recipientUserId, senderUserId); 
      setMessageText('');
      setActive(false); 
    }
  };

  return (
    <Modal active={active} setActive={setActive}>
      <h2>Send a message:</h2>
      <input
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        placeholder="Type your message here..."
      />
      <button onClick={handleSendMessage}>Send</button>
    </Modal>
  );
};