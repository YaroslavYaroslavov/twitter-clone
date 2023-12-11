import backgroundImageSrc from 'assets/background_signup.webp';
import twitterLogoSmall from 'assets/twitter-logo-signup.webp';
import styled from 'styled-components';
import { flexAlignCenter, flexColumn } from 'theme/globalStyles';

export const SignupBodyContainer = styled.main`
  ${flexAlignCenter}
`;

export const SignupContainer = styled.section`
  ${flexColumn}

  width: 100vw;
  height: 100vh;
`;

export const BackgroundImage = styled.div`
  background-image: url(${backgroundImageSrc});
  width: 60%;
  height: 100vh;
  max-width: 100vw;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const Footer = styled.footer`
  ${flexAlignCenter}

  gap: 20px;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

export const TwitterLogoSmall = styled.div`
  width: 50px;
  height: 41px;

  background-image: url(${twitterLogoSmall});
`;

export const AuthorisationSection = styled.div`
  ${flexColumn}

  justify-content: center;
  padding-left: 45px;
  gap: 35px;
  min-width: 500px;
  height: 50%;
  @media (max-width: 768px) {
    height: 100vh;
    align-items: center;
    width: 760px;
    padding: 0;
  }
`;

export const ButtonContainer = styled.div`
  ${flexColumn}

  gap: 15px;
`;

export const Policy = styled.span``;
