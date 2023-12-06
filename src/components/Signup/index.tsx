import { LoginButton } from 'components/Button';
import { footerLinks } from 'constants/footerLinks';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { FC, useContext } from 'react';
import { Link } from 'react-router-dom';

import { FirebaseContext } from '../../index';
import {
  AuthorisationSection,
  BackgroundImage,
  ButtonContainer,
  Footer,
  Policy,
  SignupBodyContainer,
  TwitterLogoSmall,
} from './styled';

export const Signup: FC = () => {
  const { auth } = useContext(FirebaseContext);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).catch(console.error);
  };

  return (
    <>
      <SignupBodyContainer>
        <section>
          <BackgroundImage />
        </section>
        <AuthorisationSection>
          <TwitterLogoSmall />
          <h1>Happening now</h1>
          <h2>Join Twitter today</h2>
          <ButtonContainer>
            <LoginButton title="Sign up with Google" callback={googleSignIn} />

            <LoginButton redirect="signup" title="Sign up with email" />
          </ButtonContainer>
          <Policy>
            By singing up you agree to the Terms of Service and Privacy Policy, including Cookie
            Use.
          </Policy>
          <span>
            Already have an account? <Link to={'/login'}>Log in</Link>
          </span>
        </AuthorisationSection>
      </SignupBodyContainer>

      <Footer>
        {footerLinks.map((el, index) => (
          <div key={index}>{el}</div>
        ))}
      </Footer>
    </>
  );
};
