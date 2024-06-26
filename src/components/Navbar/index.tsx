import { CreatePost } from 'components/CreatePost';
import { Modal } from 'components/Modal';
import { UserInfoCard } from 'components/UserInfoCard';
import { paths } from 'constants/paths';
import { StateInterface } from 'interface';
import { TwitterLogoSmall } from 'pages/Signup/styled';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useMatch } from 'react-router-dom';

import { ButtonTweet, LogoutButton, NavbarLinkContainer, NavbarStyled, StyledLink } from './styled';

const { feed, profile, map, messages} = paths;

const navbarLinks = [
  {
    icon: null,
    text: 'Лента',
    to: feed,
  },
  {
    icon: null,
    text: 'Сообщения',
    to: messages,
  },

  {
    icon: null,
    text: 'Профиль',
    to: profile,
  },
  {
    icon: null,
    text: 'Карта',
    to: map,
  },
];

export const Navbar = () => {
  const auth = useSelector((state: StateInterface) => state.auth);
  const userInfo = useSelector((state: StateInterface) => state.userInfo);

  const [modalActive, setModalActive] = useState(false);

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

      <ButtonTweet
        onClick={() => {
          setModalActive(true);
        }}
      >
        Создать пост
      </ButtonTweet>

      <UserInfoCard />

      <LogoutButton onClick={handleSignOut}>Выйти</LogoutButton>
      <Modal active={modalActive} setActive={setModalActive}>
        <CreatePost />
      </Modal>
    </NavbarStyled>
  );
};
