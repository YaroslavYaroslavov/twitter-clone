import React from 'react';
import { useSelector } from 'react-redux';
import { StyledUserInfoCard, StyledUserLink, StyledUserName, UserAvatar, UserInfoContainer, } from './styled';
export const UserInfoCard = () => {
    const userInfo = useSelector((state) => state.userInfo);
    return (React.createElement(StyledUserInfoCard, null,
        React.createElement(UserAvatar, { src: (userInfo === null || userInfo === void 0 ? void 0 : userInfo.avatar) || 'src/assets/userImage.png', alt: "avatar" }),
        React.createElement(UserInfoContainer, null,
            React.createElement(StyledUserName, null, userInfo === null || userInfo === void 0 ? void 0 : userInfo.username),
            React.createElement(StyledUserLink, null,
                "@", userInfo === null || userInfo === void 0 ? void 0 :
                userInfo.userlink))));
};
