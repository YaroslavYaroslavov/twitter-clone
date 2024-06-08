import { Modal } from 'components/Modal';
import { sendMessage } from 'components/SendMessage';
import { DatabaseReference, onValue, ref, remove } from 'firebase/database';
import { db } from 'firebaseConfig/firebase';
import { StateInterface } from 'interface';
import React, { useCallback, useEffect, useRef, useState } from 'react';
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
  ParticipantsCount,
  SendButton,
  TheirMessageInfo,
  Username,
} from './styled';

const Dialog = ({ conversation, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessageText, setNewMessageText] = useState('');
  const currentUserInfo = useSelector((state: StateInterface) => state.userInfo);
  const users = useSelector((state: StateInterface) => state.users);
  const [interlocutorInfo, setInterlocutorInfo] = useState(null);
  const messagesEndRef = useRef(null);
  const [showParticipantsModal, setShowParticipantsModal] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [usersConversation, setUsersConversation] = useState(null)

  

  const isConversation = !!conversation.name

  const handleParticipantsClick = () => {
    setShowParticipantsModal(true);
  
  };

  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'instant' });
    }
  }, []);

  const handleKickUser = (chatID, userID) => {

    Object.keys(conversation.users || {}).map(userId => {
     
      remove(ref(db, `message/usersWithMessage/${userId}/chats/${chatID}/users/${userID}`));
    });
  }

  useEffect(() => {
    if (currentUserInfo && conversation) {
      setMessages([]);
      const messagesRef = isConversation
        ? ref(
            db,
            `message/usersWithMessage/${currentUserInfo.userId}/chats/${conversation.id}`
          )
        : ref(db, `message/usersWithMessage/${currentUserInfo.userId}/users/${conversation.id}`);

        if(isConversation) {
          onValue(messagesRef, (snapshot) => {
            const conversationData = snapshot.val();
           
            if (conversationData) {
             
              const messagesList = Object.keys(conversationData.messages || {}).map((messageId) => ({
                id: messageId,
                text: conversationData.messages[messageId].text,
                sender: conversationData.messages[messageId].sender,
                timestamp: conversationData.messages[messageId].timestamp,
              }));
              setMessages(messagesList);
            }

          })
          onValue( ref(
            db,
            `message/usersWithMessage/${currentUserInfo.userId}/chats/${conversation.id}/users`
          ), (snapshot) => {
            const conversationData = snapshot.val();
            if (conversationData) {

              setUsersConversation(conversationData)
            }
          })
        } else{
          onValue(messagesRef, (snapshot) => {
            const messagesData = snapshot.val();
            if (messagesData) {
              const messagesList = Object.keys(messagesData || {}).map((messageId) => ({
                id: messageId,
                text: messagesData[messageId].text,
                sender: messagesData[messageId].sender,
                timestamp: messagesData[messageId].timestamp,
              }));
              setMessages(messagesList);
            }
          })
        }
    

      const interlocutorRef = ref(db, `users/${conversation.id}`);
      onValue(interlocutorRef, (snapshot) => {
        const interlocutorData = snapshot.val();
        setInterlocutorInfo(interlocutorData);
      });
    }

    const participantsRef = ref(
      db,
      `message/usersWithMessage/${currentUserInfo.userId}/chats/${conversation.id}/users`
    );
    onValue(participantsRef, (snapshot) => {
      const participantsData = snapshot.val();

      if (participantsData) {
        const participantsIds = Object.keys(participantsData || {});

        const participantsWithInfo = participantsIds.map((participant) =>
          users.find((user) => user.userId === participant)
        );
        setParticipants(participantsWithInfo);
      }
    });
  }, [conversation, currentUserInfo, users]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSendMessage = () => {
    if (newMessageText.trim() === '') return;
    sendMessage(newMessageText, conversation.id, currentUserInfo.userId, !conversation.name);
    setNewMessageText('');
  };
  return (
    <DialogContainer>
      {interlocutorInfo?.username ? (
        <h2>Чат с {interlocutorInfo?.username}</h2>
      ) : conversation?.name ? (
        <h2>
          {conversation?.name}
          <ParticipantsCount onClick={handleParticipantsClick}>
            {Object.keys(participants || {}).length} участника
          </ParticipantsCount>
        </h2>
      ) : (
        <h2>Загрузка...</h2>
      )}

      <MessagesContainer>
        {messages.length
          ? messages.map((message) => {
            const messageSender = users.find((user) => user.userId === message.sender);
              return (
                <MessageItem
                  key={message.id}
                  className={messageSender.userId === currentUserInfo.userId ? 'mine' : 'theirs'}
                >
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
                  <MessageContent
                    className={message.sender === currentUserInfo.userId ? 'mine' : 'theirs'}
                  >
                    {message.text}
                  </MessageContent>
                </MessageItem>
              );
            })
          : 'пока пусто'}
        <div ref={messagesEndRef} />
      </MessagesContainer>
      {(!isConversation ||  Object.keys(usersConversation || {}).includes(currentUserInfo?.userId)) &&
   <InputContainer>
     <MessageInput
       value={newMessageText}
       onChange={(e) => setNewMessageText(e.target.value)}
       placeholder="Напишите сообщение..."
     />
     <ButtonContainer>
       <SendButton onClick={handleSendMessage}>Отправить</SendButton>
       <CloseButton onClick={onClose}>Закрыть</CloseButton>
     </ButtonContainer>
   </InputContainer>
}


     
      <Modal active={showParticipantsModal} setActive={setShowParticipantsModal}>
        <div>
          <h3>Участники беседы:</h3>
          <ul>
            {participants.map((participant) => {
              
              return (
               <li key={participant.userId}>
                <AvatarLink>
                  <Username>{participant.username}</Username>
                  <Link to={`/profile/${participant.userlink}`}>
                    <Avatar src={participant.avatar} alt="Avatar" />
                  </Link>
                  <button onClick={()=>{
                    handleKickUser(conversation.id, participant.userId)
                  }}>Delete</button>
                </AvatarLink>
               
              </li>)
            }
            )}
          </ul>
        </div>
      </Modal>
    </DialogContainer>
  );
};

export default Dialog;
