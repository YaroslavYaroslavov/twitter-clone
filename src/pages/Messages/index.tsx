import CreateConversation from 'components/CreateConversation/index';
import Dialog from 'components/Dialog';
import { ButtonTweet } from 'components/Navbar/styled';
import { onValue, ref } from 'firebase/database';
import { db } from 'firebaseConfig/firebase';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Messages = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [interlocutors, setInterlocutors] = useState({});
  const [isCreatingConversation, setIsCreatingConversation] = useState(false); // Состояние для отслеживания создания беседы
  const [availableUsers, setAvailableUsers] = useState([]);
  const [chats, setChats] = useState([])

  const currentUserInfo = useSelector(state => state.userInfo);

  useEffect(() => {
    if (currentUserInfo && currentUserInfo.userId) {
      const messagesRef = ref(db, `message/usersWithMessage/${currentUserInfo.userId}/users`);

      onValue(messagesRef, (snapshot) => {
        const conversationsData = snapshot.val();
        if (conversationsData) {
          const conversationsList = Object.keys(conversationsData).map((userId) => ({
            id: userId,
            name: conversationsData[userId].name,
            lastMessage: conversationsData[userId].lastMessage,
          }));
          setConversations(conversationsList);

        
          const newInterlocutors = {};
          conversationsList.forEach((conversation) => {
           
            const interlocutorRef = ref(db, `users/${conversation.id}`);
            onValue(interlocutorRef, (snapshot) => {
              const interlocutorData = snapshot.val();
              newInterlocutors[conversation.id] = interlocutorData;
              setInterlocutors(newInterlocutors);
            });
          });
        }
      });
    }
  }, [currentUserInfo]);

  useEffect(() => {
    if (currentUserInfo && currentUserInfo.userId) {
      const messagesRef = ref(db, `message/usersWithMessage/${currentUserInfo.userId}/users`);
      const chatsRef = ref(db, `message/usersWithMessage/${currentUserInfo.userId}/chats`)

      onValue(chatsRef, (snapshot) => {
        const chatsData = snapshot.val();
        if (chatsData) {
          

          const chatsList = Object.keys(chatsData).map((key) => ({
            id: key,
            name: chatsData[key].name,
            users: chatsData[key].users,
          }));

          setChats(chatsList);
        
        }
      });

      onValue(messagesRef, (snapshot) => {
        const conversationsData = snapshot.val();
        if (conversationsData) {
          const availableUsersList = Object.keys(conversationsData).map((userId) => ({
            id: userId,
            username: conversationsData[userId].username,
            avatar: conversationsData[userId].avatar,
          }));
          setAvailableUsers(availableUsersList);
        }
      });
    }
  }, [currentUserInfo]);

  const handleConversationClick = (conversation) => {
    
    setSelectedConversation(conversation);
  };

  const handleDialogClose = () => {
    setSelectedConversation(null);
  };

  const handleCreateConversation = () => {
    setIsCreatingConversation(true);
  };

  const handleConversationCreated = () => {
    setIsCreatingConversation(false);
  
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '200px 1fr',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '10px',
        marginTop: '20px',
      }}
    >
      <div
        style={{
          padding: '5px',
          marginRight: '10px',
          borderRight: '1px solid #ccc',
          overflowY: 'auto',
          height: 'calc(100vh - 100px)',
        }}
      >
        {isCreatingConversation ? (
          <CreateConversation
            onConversationCreated={handleConversationCreated}
            availableUsers={availableUsers}
          />
        ) : (
          <>
            <>
              {conversations.map((conversation) => {
                const interlocutorInfo = interlocutors[conversation.id];
                return (
                  <div
                    key={conversation.id}
                    onClick={() => handleConversationClick(conversation)}
                    style={{
                      borderBottom: '1px solid #ccc',
                      paddingBottom: '10px',
                      marginBottom: '10px',
                      cursor: 'pointer',
                      backgroundColor: '#f8f8f8',
                      display: 'flex',
                      alignItems: 'center',
                      paddingLeft: '10px',
                    }}
                  >
                    {interlocutorInfo && (
                      <>
                        <img
                          src={interlocutorInfo.avatar}
                          alt="Avatar"
                          style={{
                            width: '30px',
                            height: '30px',
                            borderRadius: '50%',
                            marginRight: '10px',
                          }}
                        />
                        <div>
                          <h2 style={{ margin: 0, fontSize: '16px' }}>
                            {interlocutorInfo.username}
                          </h2>
                          {/* <p style={{ margin: 0, fontSize: '14px' }}>{conversation.lastMessage}</p> */}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </>
            <>
            
              {chats.map((chat) => (
                <>
                <div
                    key={chat.id}
                    onClick={() => handleConversationClick(chat)}
                    style={{
                      borderBottom: '1px solid #ccc',
                      paddingBottom: '10px',
                      marginBottom: '10px',
                      cursor: 'pointer',
                      backgroundColor: '#f8f8f8',
                      display: 'flex',
                      alignItems: 'center',
                      paddingLeft: '10px',
                    }}
                  >
                    {chat && (
                      <>
        
                        <div>
                          <h2 style={{ margin: 0, fontSize: '16px' }}>
                            {chat.name}
                          </h2>
                          {/* <p style={{ margin: 0, fontSize: '14px' }}>{conversation.lastMessage}</p> */}
                        </div>
                      </>
                    )}
                  </div>
              </>
              ))}
            </>
          </>
        )}
      </div>

      <div style={{ padding: '10px' }}>
        {selectedConversation && (
          <Dialog conversation={selectedConversation} onClose={handleDialogClose} />
        )}
        {!selectedConversation && !isCreatingConversation && (
          <div
            style={{
              position: 'absolute',
              top: '45%',
              left: '54%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <ButtonTweet
              onClick={handleCreateConversation}
              style={{ width: '150px', height: '40px', fontSize: '14px' }}
            >
              Создать беседу
            </ButtonTweet>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;