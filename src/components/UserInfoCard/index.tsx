import { StateInterface } from 'interface';
import React from 'react';
import { useSelector } from 'react-redux';

import {
  StyledUserInfoCard,
  StyledUserLink,
  StyledUserName,
  UserAvatar,
  UserInfoContainer,
} from './styled';

export const UserInfoCard = () => {
  const userInfo = useSelector((state: StateInterface) => state.userInfo);

  return (
    <StyledUserInfoCard>
      <UserAvatar src={userInfo?.avatar || 'src/assets/userImage.png'} alt="avatar" />
      <UserInfoContainer>
        <StyledUserName>{userInfo?.username}</StyledUserName>
        <StyledUserLink>@{userInfo?.userlink}</StyledUserLink>
      </UserInfoContainer>
    </StyledUserInfoCard>
  );
};
