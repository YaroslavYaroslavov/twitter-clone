import { MessageInput, MessageModalData, SendButton } from 'components/MessageModal/styled';
import { Modal } from 'components/Modal';
import { sendMessage } from 'components/SendMessage';
import React, { useState } from 'react';

export const MessageModal = ({ active, setActive, recipientUserId, senderUserId }) => {
  const [messageText, setMessageText] = useState('');

  const handleSendMessage = () => {
    if (messageText.trim() !== '') {
      sendMessage(messageText, recipientUserId, senderUserId, true);
      setMessageText('');
      setActive(false);
    }
  };

  return (
    <Modal active={active} setActive={setActive}>
      <MessageModalData>
        <h2>Ваше сообщение:</h2>
        <MessageInput
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Напишите сообщение..."
        />
        <SendButton onClick={handleSendMessage}>Отправить</SendButton>
      </MessageModalData>
    </Modal>
  );
};