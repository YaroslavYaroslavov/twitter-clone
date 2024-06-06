import { OtherOptions } from 'components/OtherOptions';
import { StyledUserLink, StyledUserName } from 'components/UserInfoCard/styled';
import { ref, remove, set } from 'firebase/database';
import { db } from 'firebaseConfig/firebase';
import { StateInterface } from 'interface';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import { PostProps } from './interface';
import {
  LikeButton,
  LikeSection,
  PostContainer,
  PostContent,
  PostHeader,
  PostInfoHeader,
  PostTextContent,
  UserAvatar,
} from './styled';

function getTimePassed(milliseconds: number) {
  const timePassed = Date.now() - milliseconds;

  const seconds = Math.floor(timePassed / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) {
    return years + ' лет';
  } else if (months > 0) {
    return months + ' мес';
  } else if (days > 0) {
    return days + ' дн';
  } else if (hours > 0) {
    return hours + ' час';
  } else if (minutes > 0) {
    return minutes + ' мин';
  } else {
    return seconds + ' с';
  }
}

export const Post: FC<PostProps> = ({ postData }) => {
  const users = useSelector((state: StateInterface) => state.users);

  console.log(users)

  const currentUserInfo = useSelector((state: StateInterface) => state.userInfo);

  if (!currentUserInfo?.userId) return;

  const currentUserPage = users?.find((user) => user.userId === postData.authorId);

  const likesUserArray = postData?.likes ? Object.keys(postData.likes) : [];

  const isLiked = likesUserArray.includes(currentUserInfo.userId);

  const toggleLikePost = () => {
    const likesRef = `tweets/${postData.authorId}/${postData.authorId}_${postData.time}/likes/${currentUserInfo?.userId}`;

    isLiked ? remove(ref(db, likesRef)) : set(ref(db, likesRef), '');
  };

  const handleDeletePost = () => {
    const postRef = `tweets/${postData.authorId}/${postData.authorId}_${postData.time}`;
    remove(ref(db, postRef));
  };

  return (
    <PostContainer>
      <UserAvatar src={currentUserPage?.avatar} />
      <PostContent>
        <PostHeader>
          <PostInfoHeader>
            <StyledUserName>{currentUserPage?.username}</StyledUserName>
            <StyledUserLink>@{currentUserPage?.userlink}</StyledUserLink>
            <span>•</span>
            <StyledUserLink>{getTimePassed(postData.time)}</StyledUserLink>
          </PostInfoHeader>
          {currentUserInfo.userId === postData.authorId && (
            <OtherOptions deletePost={handleDeletePost} />
          )}
        </PostHeader>
        <PostTextContent>{postData.content.text}</PostTextContent>

        {postData.content.images &&
          postData.content.images.map((image) => (
            <img style={{ width: '200px', height: '200px' }} src={image} key={image} />
          ))}
        <LikeSection isLiked={isLiked}>
          <LikeButton isLiked={isLiked} onClick={toggleLikePost} />

          <span>{likesUserArray.length}</span>
        </LikeSection>
      </PostContent>
    </PostContainer>
  );
};
