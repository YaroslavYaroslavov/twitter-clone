import background from 'assets/userbackgrounddefault.png';
import userImgBig from 'assets/userImageBig.png';
import { CreatePost } from 'components/CreatePost';
import { Modal } from 'components/Modal';
import { Post } from 'components/Post';
import { ref, remove, set, update } from 'firebase/database';
import { getDownloadURL, ref as refStorage, uploadBytes } from 'firebase/storage';
import { db, storage } from 'firebaseConfig/firebase';
import { StateInterface } from 'interface';
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import {
  BackgroundImg,
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
  ProfileContainer,
  ProfileInfoContainer,
  ProfileMain,
  UserAbout,
  UserAvatar,
} from './styled';

export const Profile = () => {
  const navigate = useNavigate();

  const [modalActive, setModalActive] = useState(false);
  const [userNewAvatar, setUserNewAvatar] = useState<string | ArrayBuffer | null>(null);
  const [userAvatarAsFile, setUserAvatarAsFile] = useState<File | null>(null);

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

  return (
    <>
      <ProfileContainer>
        <ProfileMain>
          <Header>
            <h2>{currentUserPage?.username}</h2>
            <Description>
              {(authorPosts && Object.keys(authorPosts).length) || 0} tweets
            </Description>
          </Header>
          <BackgroundImg src={background} alt="" />
          <ProfileInfoContainer>
            <div>
              <UserAvatar src={currentUserPage?.avatar || userImgBig} alt="avatar" />
              <h2>{currentUserPage?.username}</h2>
              <Description>@{currentUserPage?.userlink}</Description>
              <UserAbout>{currentUserPage?.description}</UserAbout>
              <FollowerInfoContainer>
                <FollowerInfoContainer>
                  <FollowCounter>{currentUserPageFollowList.length}</FollowCounter>
                  <span>Following</span>
                </FollowerInfoContainer>
                <FollowerInfoContainer>
                  <FollowCounter>{currentUserPageFollowers.length}</FollowCounter>
                  <span>Followers</span>
                </FollowerInfoContainer>
              </FollowerInfoContainer>
            </div>
            {isUserOwnerPage ? (
              <EditProfileButton onClick={handleOpenModal}>Edit Profile</EditProfileButton>
            ) : isFollowingUser ? (
              <EditProfileButton onClick={unfollowUser}>Unfollow</EditProfileButton>
            ) : (
              <FollowButton onClick={followToUser}>Follow</FollowButton>
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
          <h2>Edit your data:</h2>
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

          <FollowButton onClick={handleSaveChanges}>Save</FollowButton>
        </EditUserData>
      </Modal>
    </>
  );
};
