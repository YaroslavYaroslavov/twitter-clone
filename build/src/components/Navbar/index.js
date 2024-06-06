import { UserInfoCard } from 'components/UserInfoCard';
import { paths } from 'constants/paths';
import { TwitterLogoSmall } from 'pages/Signup/styled';
import React from 'react';
import { useSelector } from 'react-redux';
import { useMatch } from 'react-router-dom';
import { ButtonTweet, LogoutButton, NavbarLinkContainer, NavbarStyled, StyledLink } from './styled';
const { feed, profile } = paths;
const navbarLinks = [
    {
        icon: null,
        text: 'Home',
        to: feed,
    },
    {
        icon: null,
        text: 'Explore',
        to: feed,
    },
    {
        icon: null,
        text: 'Notifications',
        to: feed,
    },
    {
        icon: null,
        text: 'Messages',
        to: feed,
    },
    {
        icon: null,
        text: 'Bookmarks',
        to: feed,
    },
    {
        icon: null,
        text: 'Lists',
        to: feed,
    },
    {
        icon: null,
        text: 'Profile',
        to: profile,
    },
    {
        icon: null,
        text: 'More',
        to: feed,
    },
];
export const Navbar = () => {
    const auth = useSelector((state) => state.auth);
    const userInfo = useSelector((state) => state.userInfo);
    const handleSignOut = () => {
        auth.signOut();
        location.reload();
    };
    return (React.createElement(NavbarStyled, null,
        React.createElement(TwitterLogoSmall, null),
        React.createElement(NavbarLinkContainer, null, navbarLinks.map(({ to, text }, index) => {
            if (to === profile) {
                return (React.createElement(StyledLink, { ismatch: useMatch(to), to: `/profile/${userInfo === null || userInfo === void 0 ? void 0 : userInfo.userlink}`, key: index }, text));
            }
            else
                return (React.createElement(StyledLink, { ismatch: useMatch(to), to: to, key: index }, text));
        })),
        React.createElement(ButtonTweet, null, "Tweet"),
        React.createElement(UserInfoCard, null),
        React.createElement(LogoutButton, { onClick: handleSignOut }, "Log out")));
};
