import background from 'assets/userbackgrounddefault.png';
import userImgBig from 'assets/userImageBig.png';
import { CreatePost } from 'components/CreatePost';
import { MessageModal } from 'components/MessageModal';
import { Modal } from 'components/Modal';
import { Post } from 'components/Post';
import { Recomendation } from 'components/Recomendation';
import { RecomendationContainer } from 'components/SearchSection/styled';
import { onValue, ref, remove, set, update } from 'firebase/database';
import { getDownloadURL, ref as refStorage, uploadBytes } from 'firebase/storage';
import { db, storage } from 'firebaseConfig/firebase';
import { StateInterface } from 'interface';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import {
  AvatarContainer,
  BackgroundImg,
  ButtonsWrapper,
  Description,
  DescriptionInput,
  EditProfileButton,
  EditUserAvatar,
  EditUserData,
  EditUserInput,
  EditUserWrapper,
  FollowButton,
  FollowCounter,
  FollowerInfoContainer,
  Header,
  MessageButton,
  ProfileContainer,
  ProfileInfoContainer,
  ProfileMain,
  StatusCircle,
  UserAbout,
  UserAvatar,
} from './styled';

export const Profile = () => {
  const navigate = useNavigate();

  const [modalActive, setModalActive] = useState(false);
  const [userNewAvatar, setUserNewAvatar] = useState<string | ArrayBuffer | null>(null);
  const [userAvatarAsFile, setUserAvatarAsFile] = useState<File | null>(null);

  const [followersModal, setFollowersModal] = useState(false);
  const [followingModal, setFollowingModal] = useState(false);

  const newNameRef = useRef<HTMLInputElement | null>(null);
  const newLinkRef = useRef<HTMLInputElement | null>(null);
  const newDescriptionRef = useRef<HTMLTextAreaElement | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentUserInfo = useSelector((state: StateInterface) => state.userInfo);

  const posts = useSelector((state: StateInterface) => state.posts);
  const users = useSelector((state: StateInterface) => state.users);

  const { id } = useParams();

  const currentUserPage = users?.find((user) => user.userlink === id);
  const currentUserPageFollowList = Object.keys(currentUserPage?.follow || {});
  const currentUserPageFollowers = Object.keys(currentUserPage?.followers || {});

  const isFollowingUser = Object.keys(currentUserInfo?.follow || {}).find(
    (userId) => userId === currentUserPage?.userId
  );

  const authorPosts = currentUserPage && posts && posts[currentUserPage?.userId];

  const isUserOwnerPage = currentUserInfo?.userlink === id;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    if (selectedFile) {
      if (selectedFile.type.indexOf('image/') === 0) {
        setUserAvatarAsFile(selectedFile);
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target) {
            setUserNewAvatar(e.target.result);
          }
        };
        reader.readAsDataURL(selectedFile);
      } else {
        alert('Only images');
      }
    }
  };

  const handleSaveChanges = () => {
    if (!newLinkRef.current || !newLinkRef.current.value) return;
    if (!newNameRef.current || !newNameRef.current.value) return;
    if (!newDescriptionRef.current) return;
    if (
      users?.find((user) => user.userlink === newLinkRef.current?.value) &&
      newLinkRef.current?.value !== currentUserInfo?.userlink
    ) {
      alert('Id alredy used');
      return;
    }

    update(ref(db, `users/${currentUserInfo?.userId}`), {
      userlink: newLinkRef.current.value,
      username: newNameRef.current.value,
      description: newDescriptionRef.current.value,
    });

    navigate('/profile/' + newLinkRef.current.value);

    if (userAvatarAsFile === null) return;

    const blob = new Blob([userAvatarAsFile], {
      type: userAvatarAsFile.type,
    });
    uploadBytes(refStorage(storage, `avatars/${currentUserInfo?.userId}`), blob).then(() => {
      getDownloadURL(refStorage(storage, `avatars/${currentUserInfo?.userId}`)).then((link) => {
        set(ref(db, `users/${currentUserInfo?.userId}/avatar`), link);
      });
    });
  };

  const handleFileUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleOpenModalFollowers = () => {
    setFollowersModal(true);
  };

  const handleOpenModalFollowing = () => {
    setFollowingModal(true);
  };

  const handleOpenModal = () => {
    setModalActive(true);
  };

  const followToUser = () => {
    set(ref(db, `users/${currentUserInfo?.userId}/follow/${currentUserPage?.userId}`), '');
    set(ref(db, `users/${currentUserPage?.userId}/followers/${currentUserInfo?.userId}`), '');
  };

  const unfollowUser = () => {
    remove(ref(db, `users/${currentUserInfo?.userId}/follow/${currentUserPage?.userId}`));
    remove(ref(db, `users/${currentUserPage?.userId}/followers/${currentUserInfo?.userId}`));
  };

  const [messageModalActive, setMessageModalActive] = useState(false);

  const handleMessageButtonClick = () => {
    setMessageModalActive(true);
  };

  // Загрузка истории сообщений для каждого пользователя
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const loadConversations = async () => {
      const loadedConversations = [];

      for (const conversation of currentUserInfo?.conversations || []) {
        const conversationRef = ref(
          db,
          `message/usersWithMessage/${currentUserInfo?.userId}/users/${conversation.userId}`
        );
        onValue(conversationRef, (snapshot) => {
          const data = snapshot.val();
          const lastMessage = Object.values(data?.lastMessage || {})[0];
          loadedConversations.push({
            id: conversation.userId,
            name: conversation.username,
            lastMessage: lastMessage,
          });
          setConversations([...loadedConversations]);
        });
      }
    };

    loadConversations();
  }, [currentUserInfo]);
  console.log(Date.now() - Number(currentUserPage?.lastOnline || 0));
  return (
    <>
      <ProfileContainer>
        <ProfileMain>
          <Header>
            <h2>{currentUserPage?.username}</h2>
            <Description>
              {(authorPosts && Object.keys(authorPosts).length) || 0} публикаций
            </Description>
          </Header>
          <BackgroundImg src={background} alt="" />
          <ProfileInfoContainer>
            <div>
              <AvatarContainer>
                <UserAvatar src={currentUserPage?.avatar || userImgBig} alt="avatar" />
                {Date.now() - Number(currentUserPage?.lastOnline || 0) < 60000 && <StatusCircle />}
              </AvatarContainer>
              <h2>{currentUserPage?.username}</h2>
              <Description>@{currentUserPage?.userlink}</Description>
              <UserAbout>{currentUserPage?.description}</UserAbout>
              <FollowerInfoContainer>
                <FollowerInfoContainer onClick={handleOpenModalFollowing}>
                  <FollowCounter>{currentUserPageFollowList.length}</FollowCounter>
                  <span>Подписки</span>
                </FollowerInfoContainer>
                <FollowerInfoContainer onClick={handleOpenModalFollowers}>
                  <FollowCounter>{currentUserPageFollowers.length}</FollowCounter>
                  <span>Подписчики</span>
                </FollowerInfoContainer>
              </FollowerInfoContainer>
            </div>

            {conversations.map((conversation) => {
              return (
                <div
                  key={conversation.id}
                  onClick={() => handleConversationClick(conversation)}
                  style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}
                >
                  <h2>{conversation.name}</h2>
                  <p>
                    {conversation.lastMessage ? conversation.lastMessage.text : 'Нет сообщений'}
                  </p>
                </div>
              );
            })}

            {isUserOwnerPage ? (
              <EditProfileButton onClick={handleOpenModal}>Редактировать</EditProfileButton>
            ) : isFollowingUser ? (
              <ButtonsWrapper>
                <MessageButton onClick={handleMessageButtonClick}>Сообщение</MessageButton>
                <EditProfileButton onClick={unfollowUser}>Отписаться</EditProfileButton>
              </ButtonsWrapper>
            ) : (
              <ButtonsWrapper>
                <MessageButton onClick={handleMessageButtonClick}>Сообщение</MessageButton>
                <FollowButton onClick={followToUser}>Подписаться</FollowButton>
              </ButtonsWrapper>
            )}
          </ProfileInfoContainer>
          {isUserOwnerPage && <CreatePost />}
          {authorPosts &&
            Object.values(authorPosts)
              .reverse()
              .map((post) => {
                return <Post key={post.postId} postData={post} />;
              })}
        </ProfileMain>
      </ProfileContainer>
      <Modal active={modalActive} setActive={setModalActive}>
        <EditUserData>
          <h2>Редактирование</h2>
          <EditUserAvatar onClick={handleFileUploadClick}>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <UserAvatar
              src={userNewAvatar?.toString() || currentUserPage?.avatar || userImgBig}
              alt="avatar"
            />
          </EditUserAvatar>
          <EditUserWrapper>
            <p>Name:</p>
            <EditUserInput ref={newNameRef} defaultValue={currentUserPage?.username} />
          </EditUserWrapper>
          <EditUserWrapper>
            <p>Link</p>
            <EditUserInput ref={newLinkRef} id={'link'} defaultValue={currentUserPage?.userlink} />
          </EditUserWrapper>
          <EditUserWrapper>
            <p>About:</p>
            <DescriptionInput ref={newDescriptionRef} defaultValue={currentUserPage?.description} />
          </EditUserWrapper>

          <FollowButton onClick={handleSaveChanges}>Сохранить</FollowButton>
        </EditUserData>
      </Modal>

      <Modal active={followersModal} setActive={setFollowersModal}>
        <h1>Подписчики</h1>
        <RecomendationContainer
          onClick={() => {
            setFollowersModal(false);
          }}
        >
          {currentUserPageFollowers.map((userId) => (
            <Recomendation key={userId} userId={userId} />
          ))}
        </RecomendationContainer>
      </Modal>
      <Modal active={followingModal} setActive={setFollowingModal}>
        <h1>Подписки</h1>
        <RecomendationContainer
          onClick={() => {
            setFollowingModal(false);
          }}
        >
          {currentUserPageFollowList.map((userId) => (
            <Recomendation key={userId} userId={userId} />
          ))}
        </RecomendationContainer>
      </Modal>
      <MessageModal
        active={messageModalActive}
        setActive={setMessageModalActive}
        recipientUserId={currentUserPage?.userId}
        senderUserId={currentUserInfo?.userId}
      />
    </>
  );
};
