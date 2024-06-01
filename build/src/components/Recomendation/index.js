import userImage from 'assets/userImage.png';
import { UserAvatar } from 'components/UserInfoCard/styled';
import { FollowButton } from 'pages/Profile/styled';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ProfileContainer, UserRecomedationContainer } from './styled';
export const Recomendation = ({ userId }) => {
    const users = useSelector((state) => state.users);
    const user = users === null || users === void 0 ? void 0 : users.find((user) => user.userId === userId);
    return (React.createElement(ProfileContainer, null,
        React.createElement(UserRecomedationContainer, null,
            React.createElement(UserAvatar, { src: (user === null || user === void 0 ? void 0 : user.avatar) || userImage, alt: "avatar" }),
            React.createElement(Link, { to: `/profile/${user === null || user === void 0 ? void 0 : user.userlink}` },
                React.createElement("p", null, user === null || user === void 0 ? void 0 : user.username),
                React.createElement("p", null,
                    "@", user === null || user === void 0 ? void 0 :
                    user.userlink))),
        React.createElement(FollowButton, null, "Follow")));
};
