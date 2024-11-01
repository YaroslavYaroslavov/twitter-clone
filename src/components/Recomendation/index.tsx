import userImage from 'assets/userImage.png';
import { UserAvatar } from 'components/UserInfoCard/styled';
import { ref, remove, set } from 'firebase/database';
import { db } from 'firebaseConfig/firebase';
import { StateInterface } from 'interface';
import { EditProfileButton, FollowButton } from 'pages/Profile/styled';
import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { RecomendationProps } from './interface';
import { ProfileContainer, UserRecomedationContainer } from './styled';

export const Recomendation: FC<RecomendationProps> = ({ userId }) => {
  const users = useSelector((state: StateInterface) => state.users);
  const currentUserInfo = useSelector((state: StateInterface) => state.userInfo);


  const user = users?.find((user) => user.userId === userId);

  const isCurrentUser = currentUserInfo?.userId === userId;

  const [isFollowed, setIsFollowed] = useState(
    Object.keys(currentUserInfo?.follow || {}).includes(userId)
  );

  const followToUser = () => {
    setIsFollowed(true);
    set(ref(db, `users/${currentUserInfo?.userId}/follow/${userId}`), '');
    set(ref(db, `users/${userId}/followers/${currentUserInfo?.userId}`), '');
  };

  const unfollowUser = () => {
    setIsFollowed(false);
    remove(ref(db, `users/${currentUserInfo?.userId}/follow/${userId}`));
    remove(ref(db, `users/${userId}/followers/${currentUserInfo?.userId}`));
  };

  return (
    <ProfileContainer>
      <UserRecomedationContainer>
        <UserAvatar src={user?.avatar || userImage} alt="avatar" />
        <Link to={`/profile/${user?.userlink}`}>
          <p>{user?.username}</p>
          <p>@{user?.userlink}</p>
        </Link>
      </UserRecomedationContainer>
      {!isCurrentUser &&
        (isFollowed ? (
          <EditProfileButton onClick={unfollowUser}>Отписаться</EditProfileButton>
        ) : (
          <FollowButton onClick={followToUser}>Подписаться</FollowButton>
        ))}
    </ProfileContainer>
  );
};
