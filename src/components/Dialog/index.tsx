import { sendMessage } from 'components/SendMessage';
import { onValue,ref } from 'firebase/database';
import { db } from 'firebaseConfig/firebase';
import { StateInterface } from 'interface';
import React, { useCallback,useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  Avatar, 
  AvatarLink, 
  ButtonContainer, 
  CloseButton, 
  DialogContainer,
  InputContainer, 
  MessageContent, 
  MessageInput, 
  MessageItem, 
  MessagesContainer, 
  SendButton, 
  TheirMessageInfo,
  Username} from './styled';
 
const Dialog = ({ conversation, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessageText, setNewMessageText] = useState('');
  const currentUserInfo = useSelector((state: StateInterface) => state.userInfo);
  const users = useSelector((state: StateInterface) => state.users)
  const [interlocutorInfo, setInterlocutorInfo] = useState(null);
  const messagesEndRef = useRef(null); 

  // Функция скроллинга
  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'instant' });
    }
  }, []);

  useEffect(() => {
    if (currentUserInfo && conversation) {
      setMessages([])
      const messagesRef = conversation.name ? ref(db, `message/usersWithMessage/${currentUserInfo.userId}/chats/${conversation.id}/messages`): ref(db, `message/usersWithMessage/${currentUserInfo.userId}/users/${conversation.id}`) 
        onValue(messagesRef, (snapshot) => {
          
          const messagesData = snapshot.val()
          
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
     
  }, [conversation]);

  useEffect(() => {
    scrollToBottom(); // Прокрутка до последнего сообщения 
  }, [messages, scrollToBottom]);

  const handleSendMessage = () => {
    if (newMessageText.trim() === '') return;
   
    sendMessage(newMessageText, conversation.id, currentUserInfo.userId, !conversation.name);

    setNewMessageText('');
  };  


  return (
    <DialogContainer>
      {interlocutorInfo?.username ? <h2>Чат с {interlocutorInfo?.username}</h2> :
       conversation?.name ?  <h2>Беседа {conversation?.name}</h2> : 
       <h2>Загрузка...</h2>
      }

      <MessagesContainer>
      {messages.length ? messages.map((message) =>  {
        const messageSender = users.find(user => user.userId === message.sender)
      
    return  (
      <MessageItem key={messageSender.id} className={messageSender.userId === currentUserInfo.userId ? 'mine' : 'theirs'}>
      {messageSender.userId !== currentUserInfo.userId && (
        <TheirMessageInfo>
          <AvatarLink>
            <Link to={`/profile/${messageSender.userlink}`}>
              <Avatar src={messageSender.avatar} alt="Avatar" />
            </Link>
            <Username>{messageSender.username}</Username>
          </AvatarLink>
        </TheirMessageInfo>
      )}
      <MessageContent className={message.sender === currentUserInfo.userId ? 'mine' : 'theirs'}>
        {message.text}
      </MessageContent>
    </MessageItem>
    )
       
}) : 'пока пусто'}
      <div ref={messagesEndRef} />
    </MessagesContainer>
      <InputContainer>
        <MessageInput
          value={newMessageText}
          onChange={(e) => setNewMessageText(e.target.value)}
          placeholder="Type a message..."
        />
        <ButtonContainer>
          <SendButton onClick={handleSendMessage}>Отправить</SendButton>
          <CloseButton onClick={onClose}>Закрыть</CloseButton>
        </ButtonContainer>
      </InputContainer>
    </DialogContainer>
  );
};

export default Dialog;