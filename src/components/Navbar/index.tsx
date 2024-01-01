import { UserInfoCard } from 'components/UserInfoCard';
import { paths } from 'constants/paths';
import { StateInterface } from 'interface';
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
  const auth = useSelector((state: StateInterface) => state.auth);
  const userInfo = useSelector((state: StateInterface) => state.userInfo);

  const handleSignOut = () => {
    auth.signOut();
    location.reload();
  };
  return (
    <NavbarStyled>
      <TwitterLogoSmall />

      <NavbarLinkContainer>
        {navbarLinks.map(({ to, text }, index) => {
          if (to === profile) {
            return (
              <StyledLink ismatch={useMatch(to)} to={`/profile/${userInfo?.userlink}`} key={index}>
                {text}
              </StyledLink>
            );
          } else
            return (
              <StyledLink ismatch={useMatch(to)} to={to} key={index}>
                {text}
              </StyledLink>
            );
        })}
      </NavbarLinkContainer>

      <ButtonTweet>Tweet</ButtonTweet>

      <UserInfoCard />

      <LogoutButton onClick={handleSignOut}>Log out</LogoutButton>
    </NavbarStyled>
  );
};
