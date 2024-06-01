import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { ref, onValue } from 'firebase/database';
import { db } from 'firebaseConfig/firebase';
import { StateInterface } from 'interface';
import { sendMessage } from 'components/SendMessage';
import { Link } from 'react-router-dom';

import {
  DialogContainer,
  MessagesContainer, 
  MessageItem, 
  AvatarLink, 
  Avatar, 
  Username, 
  MessageContent, 
  InputContainer, 
  MessageInput, 
  ButtonContainer, 
  SendButton, 
  CloseButton, 
  TheirMessageInfo
} from './styled';

const Dialog = ({ conversation, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessageText, setNewMessageText] = useState('');
  const currentUserInfo = useSelector((state: StateInterface) => state.userInfo);
  const [interlocutorInfo, setInterlocutorInfo] = useState(null);
  const messagesEndRef = useRef(null); 

  // Функция скроллинга
  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'auto' });
    }
  }, []);

  useEffect(() => {
    if (currentUserInfo && conversation) {
      console.log(conversation)
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

      // onValue(chatsRef, (snapshot) => {
      //   const chatsData = snapshot.val();
      //   if (chatsData) {
      //     const chatsList = Object.keys(chatsData).map((chatID) => ({
      //       id: chatID
      //     }));
      //     setChats(chatsData);
      //     console.log("chatsData: ",chatsData)
      //   }
      // })

      const interlocutorRef = ref(db, `users/${conversation.id}`);
      onValue(interlocutorRef, (snapshot) => {
        const interlocutorData = snapshot.val();
        setInterlocutorInfo(interlocutorData);
      });
    }
  }, [conversation, currentUserInfo]);

  useEffect(() => {
    scrollToBottom(); // Прокрутка до последнего сообщения 
  }, [messages, scrollToBottom]);

  const handleSendMessage = () => {
    if (newMessageText.trim() === '') return;
    sendMessage(newMessageText, conversation.id, currentUserInfo.userId);
    setNewMessageText('');
  };

  // отрисовка аватара
  const renderInterlocutorInfo = (message) => {
    if (message.sender !== currentUserInfo.userId) {
      return (
        <TheirMessageInfo>
          <AvatarLink>
            <Link to={`/profile/${interlocutorInfo.userlink}`}>
              <Avatar src={interlocutorInfo.avatar} alt="Avatar" />
            </Link>
            <Username>{interlocutorInfo.username}</Username>
          </AvatarLink>
        </TheirMessageInfo>
      );
    }
    return null;
  };

  return (
    <DialogContainer>
      <h2>Dialog with {interlocutorInfo ? interlocutorInfo.username : 'Loading...'}</h2>
      <MessagesContainer>
      {messages.map((message) => (
        <MessageItem key={message.id} className={message.sender === currentUserInfo.userId ? 'mine' : 'theirs'}>
          {message.sender !== currentUserInfo.userId && (
            <TheirMessageInfo>
              <AvatarLink>
                <Link to={`/profile/${interlocutorInfo.userlink}`}>
                  <Avatar src={interlocutorInfo.avatar} alt="Avatar" />
                </Link>
                <Username>{interlocutorInfo.username}</Username>
              </AvatarLink>
            </TheirMessageInfo>
          )}
          <MessageContent className={message.sender === currentUserInfo.userId ? 'mine' : 'theirs'}>
            {message.text}
          </MessageContent>
        </MessageItem>
      ))}
      <div ref={messagesEndRef} />
    </MessagesContainer>
      <InputContainer>
        <MessageInput
          value={newMessageText}
          onChange={(e) => setNewMessageText(e.target.value)}
          placeholder="Type a message..."
        />
        <ButtonContainer>
          <SendButton onClick={handleSendMessage}>Send</SendButton>
          <CloseButton onClick={onClose}>Close</CloseButton>
        </ButtonContainer>
      </InputContainer>
    </DialogContainer>
  );
};

export default Dialog;