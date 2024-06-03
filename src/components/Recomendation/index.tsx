import userImage from 'assets/userImage.png';
import { UserAvatar } from 'components/UserInfoCard/styled';
import { StateInterface } from 'interface';
import { FollowButton } from 'pages/Profile/styled';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { RecomendationProps } from './interface';
import { ProfileContainer, UserRecomedationContainer } from './styled';

export const Recomendation: FC<RecomendationProps> = ({ userId }) => {
  const users = useSelector((state: StateInterface) => state.users);

  const user = users?.find((user) => user.userId === userId);

  return (
    <ProfileContainer>
      <UserRecomedationContainer>
        <UserAvatar src={user?.avatar || userImage} alt="avatar" />
        <Link to={`/profile/${user?.userlink}`}>
          <p>{user?.username}</p>
          <p>@{user?.userlink}</p>
        </Link>
      </UserRecomedationContainer>
      <FollowButton>Подписаться</FollowButton>
    </ProfileContainer>
  );
};
