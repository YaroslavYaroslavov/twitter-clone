import { TweetBtn } from 'components/CreatePost/styled';
import { Modal } from 'components/Modal';
import { sendMessage } from 'components/SendMessage';
import { DatabaseReference, onValue, push, ref, remove, set } from 'firebase/database';
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
  CrossBtn,
  DialogContainer,
  DialogHeader,
  EditUsersContainer,
  GoBack,
  HeaderModal,
  InputContainer,
  MembersList,
  MessageContent,
  MessageInput,
  MessageItem,
  MessagesContainer,
  NoMessages,
  ParticipantsCount,
  SendButton,
  SystemMessage,
  TheirMessageInfo,
  Username,
} from './styled';

const Dialog = ({ conversation, onClose, availableUsers }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessageText, setNewMessageText] = useState('');
  const currentUserInfo = useSelector((state: StateInterface) => state.userInfo);
  const users = useSelector((state: StateInterface) => state.users);
  const [interlocutorInfo, setInterlocutorInfo] = useState(null);
  const messagesEndRef = useRef(null);
  const [showParticipantsModal, setShowParticipantsModal] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [usersConversation, setUsersConversation] = useState(null)
  const [isAddingStage, setIsAddingStage] = useState(false)
  

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
    
    const isExit = userID === currentUserInfo?.userId

    const codeOperation = isExit ? 801 : 802
    
    if(isExit){
      setShowParticipantsModal(false)
    }


    const kickMessage = {
      recipient: chatID,
      sender: 'system',
      target: userID,
      timestamp: Date.now(),
      code: codeOperation,
      info: 'kick',
      iniciator: currentUserInfo?.userId
      
    }
    
    Object.keys(conversation.users).forEach(userId => {
      const kickMessageKey = push(ref(db,  `message/usersWithMessage/${userId}/chats/${chatID}/messages/`)).key
      set(ref(db,  `message/usersWithMessage/${userId}/chats/${chatID}/messages/${kickMessageKey}`), kickMessage)
    })
    
    Object.keys(conversation.users || {}).map(userId => {

      remove(ref(db, `message/usersWithMessage/${userId}/chats/${chatID}/users/${userID}`));
    });
  }

  const handleUserSelect = (user) => {
    setSelectedUsers((prevSelectedUsers) => {
      const isUserSelected = prevSelectedUsers.some((selectedUser) => selectedUser.id === user.id);
      if (isUserSelected) {
        return prevSelectedUsers.filter((selectedUser) => selectedUser.id !== user.id);
      } else {
        return [...prevSelectedUsers, user];
      }
    });
  };


  const handleChangeStage = ()  => {
    setIsAddingStage(prev => !prev)
  }

  const handleAddUsers = () => {
   
    selectedUsers.forEach(user => {

      const addMessageKey = push(ref(db,  `message/usersWithMessage/${user.id}/chats/${conversation.id}/messages/`)).key

      const addMessage = {
        recipient: conversation.id,
        sender: 'system',
        target: user.id,
        timestamp: Date.now(),
        code: 803,
        info: 'add',
        iniciator: currentUserInfo?.userId
        
      }

      // Object.keys(conversation.users).forEach(userId => {
      //   const kickMessageKey = push(ref(db,  `message/usersWithMessage/${userId}/chats/${chatID}/messages/`)).key
      //   set(ref(db,  `message/usersWithMessage/${userId}/chats/${chatID}/messages/${kickMessageKey}`), kickMessage)
      // })

      const newConversationData = {
        name: conversation.name,
        users: {...conversation.users, [user.id]:'' },
        messages: {[addMessageKey]: addMessage}
      };
      Object.keys(conversation.users || {}).map(userId => {
        set(ref(db, `message/usersWithMessage/${userId}/chats/${conversation.id}/users/${user.id}`), '');
        set(ref(db,  `message/usersWithMessage/${userId}/chats/${conversation.id}/messages/${addMessageKey}`), addMessage)
        
      });
      set(ref(db, `message/usersWithMessage/${user.id}/chats/${conversation.id}`), newConversationData)
    })
    
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
                ...conversationData.messages[messageId],
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

  const isMemberConversation = (!isConversation ||  Object.keys(usersConversation || {}).includes(currentUserInfo?.userId))

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSendMessage = () => {
    if (newMessageText.trim() === '') return;
    sendMessage(newMessageText, conversation.id, currentUserInfo.userId, !conversation.name);
    setNewMessageText('');
  };

  const membersCount =  Object.keys(participants || {}).length
  return (
    <DialogContainer>
      <DialogHeader>
      {interlocutorInfo?.username ? (
        <h2>Чат с {interlocutorInfo?.username}</h2>
      ) : conversation?.name ? (
        <>
         <h2>
          {conversation?.name}
        </h2>
         {
          isMemberConversation && <ParticipantsCount onClick={handleParticipantsClick}>
          {Object.keys(participants || {}).length} 
          {membersCount < 2 ? ' участник' : membersCount < 5 ? ' участника' : ' участников'}
        </ParticipantsCount>
        } 
        </>
       
        
      ) : (
        <h2>Загрузка...</h2>
      )}
        <CloseButton onClick={onClose}>Закрыть</CloseButton>
      </DialogHeader>
      

      <MessagesContainer>
        {messages.length
          ? messages.map((message) => {
            if(message.sender === 'system') {
              
              const userIniciator = users?.find((user) => user.userId === message.iniciator);
              const userTarget = users?.find((user) => user.userId === message.target);
             
             let messageBody = 'Системное сообщение'

             switch(message.code) {
              case 800: 
              messageBody = `${userIniciator?.username} создал беседу ${conversation.name}`
              break
              case 801: 
              messageBody = `${userIniciator?.username} вышел из чата`
                break
              case 802: 
              messageBody = `${userIniciator?.username} исключил ${userTarget?.username}`
                break
              case 803: 
                messageBody = `${userIniciator?.username} пригласил ${userTarget?.username}`
                break
             }


              return <SystemMessage key={message.id}>{messageBody}</SystemMessage>
            }

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
          : <NoMessages>В этом чате нет сообщений</NoMessages>}
        <div ref={messagesEndRef} />
      </MessagesContainer>
      
   <InputContainer>
   {
   isMemberConversation && <MessageInput
       value={newMessageText}
       onChange={(e) => setNewMessageText(e.target.value)}
       placeholder="Напишите сообщение..."
     />
   }
     
     <ButtonContainer>
    {
      isMemberConversation ? <SendButton onClick={handleSendMessage}/> : 'Вы не являетесь участником чата'
    }   
     
     </ButtonContainer>
   </InputContainer>



     
      <Modal active={showParticipantsModal} setActive={setShowParticipantsModal}>
        { isAddingStage ? <EditUsersContainer>
        <GoBack onClick={handleChangeStage}></GoBack>
        <HeaderModal>
        {
  availableUsers.some((user) => !Object.keys(usersConversation).includes(user.id)) ?
    <p>Пригласить пользователей</p>
  : <p>Нет подходящих пользователей</p>
}
       
        </HeaderModal>
        <div>
        {availableUsers.map((user) => {
          const currentUser = users?.find((userr) => userr.userId === user.id);
          
          if(Object.keys(usersConversation).includes(user.id)) {return null} else{
            return (
              
              <div key={user.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', padding: '10px', borderBottom: '1px solid #ccc', cursor: 'pointer', backgroundColor: '#f8f8f8' }}>
                <input
                  type="checkbox"
                  checked={selectedUsers.some((selectedUser) => selectedUser.id === user.id)}
                  onChange={() => handleUserSelect(user)}
                  style={{ marginRight: '10px' }}
                />
                <img src={currentUser?.avatar} alt="Avatar" style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }} />
                <span style={{ fontWeight: 'bold' }}>{currentUser?.username}</span>
              </div>
              
            );
          }
          
        })}
      </div>
  
      {
  availableUsers.some((user) => !Object.keys(usersConversation).includes(user.id)) ?
    <TweetBtn onClick={handleAddUsers}>Пригласить</TweetBtn>
  : null
}
    
       
        </EditUsersContainer> :
        <EditUsersContainer>
              <HeaderModal>
              
              <p>Список пользователей</p>
                {/* <CloseModal></CloseModal> */}
              </HeaderModal>
          
          <MembersList>
            {participants.map((participant) => {
              
              return (
               <li key={participant.userId}>
                <AvatarLink>
                  <Username>{participant.username}</Username>
                  <Link to={`/profile/${participant.userlink}`}>
                    <Avatar src={participant.avatar} alt="Avatar" />
                  </Link>
                  <CrossBtn onClick={()=>{
                    handleKickUser(conversation.id, participant.userId)
                  }}></CrossBtn>
                </AvatarLink>
               
              </li>)
            }
            )}
          </MembersList>

          <TweetBtn onClick={handleChangeStage}>Пригласить</TweetBtn>
        </EditUsersContainer>} 
      </Modal>
    </DialogContainer>
  );
};

export default Dialog;
