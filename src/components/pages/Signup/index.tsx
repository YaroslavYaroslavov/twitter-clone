import { LoginButton } from 'components/Button';
import { footerLinks } from 'constants/footerLinks';
import { paths } from 'constants/paths';
import { googleSignIn } from 'helpers/googleSignIn';
import React, { FC, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { configSignup } from './config';
import {
  AuthorisationSection,
  BackgroundImage,
  ButtonContainer,
  Footer,
  Policy,
  SignupBodyContainer,
  SignupContainer,
  TwitterLogoSmall,
} from './styled';

const { signup, login } = paths;
const {
  policyDescription,
  alredyHaveAccount,
  loginLink,
  mainHeader,
  botHeader,
  signinWithGoogle,
  signinWithEmail,
} = configSignup;

export const Signup: FC = () => {
  const navigate = useNavigate();

  const emailSignIn = useCallback(() => {
    navigate(signup);
  }, [navigate, signup]);

  return (
    <SignupContainer>
      <SignupBodyContainer>
        <BackgroundImage />
        <AuthorisationSection>
          <TwitterLogoSmall />
          <h1>{mainHeader}</h1>
          <h2>{botHeader}</h2>
          <ButtonContainer>
            <LoginButton title={signinWithGoogle} callback={googleSignIn} />

            <LoginButton title={signinWithEmail} callback={emailSignIn} />
          </ButtonContainer>
          <Policy>{policyDescription}</Policy>
          <span>
            {alredyHaveAccount} <Link to={login}>{loginLink}</Link>
          </span>
        </AuthorisationSection>
      </SignupBodyContainer>

      <Footer>
        {footerLinks.map((link) => (
          <a key={link}>{link}</a>
        ))}
      </Footer>
    </SignupContainer>
  );
};
