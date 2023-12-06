import styled from 'styled-components';

import backgroundImageSrc from '../../assets/background_signup.png';
import twitterLogoSmall from '../../assets/twitter-logo-signup.png';

export const SignupBodyContainer = styled.main`
  display: flex;
  align-items: center;
`;

export const BackgroundImage = styled.div`
  background-image: url(${backgroundImageSrc});
  width: 1121px;
  height: 1028px;
  max-width: 100vw;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const Footer = styled.footer`
  display: flex;
  align-items: center;
  gap: 20px;
  height: 5vh;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

export const TwitterLogoSmall = styled.div`
  width: 50px;
  height: 41px;
  background-image: url(${twitterLogoSmall});
`;

export const AuthorisationSection = styled.div`
  padding-left: 45px;
  display: flex;
  flex-direction: column;
  gap: 35px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const Policy = styled.span``;
