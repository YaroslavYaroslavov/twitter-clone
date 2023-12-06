import { RoutesArr } from 'constants/routes';
import { RecaptchaVerifier } from 'firebase/auth';
import React, { useContext, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Route, Routes, useMatch, useNavigate } from 'react-router-dom';

import { FirebaseContext } from '../../index';
import GlobalStyles from './styled';

function App() {
  const { auth } = useContext(FirebaseContext);
  const [user] = useAuthState(auth);

  const isSingnupPage = useMatch('/signup');
  const isUserNotVerifyPhoneWithoutUsingGoogle =
    user && !user.phoneNumber && user.providerData[0].providerId !== 'google.com' && !isSingnupPage;

  if (isUserNotVerifyPhoneWithoutUsingGoogle) {
    user.delete();
  }

  const setUpRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'invisible',
    });

    window.recaptchaVerifier.verify();
  };

  useEffect(() => {
    setUpRecaptcha();
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    if (user && !user.phoneNumber && user.providerData[0].providerId !== 'google.com') return;
    if (!user) {
      navigate('/');
    } else {
      navigate('/feed');
    }
  }, [user]);

  return (
    <>
      <div id="recaptcha-container"></div>
      <Routes>
        {RoutesArr.map(({ pathname, element }) => (
          <Route key={pathname} path={pathname} element={element} />
        ))}
      </Routes>

      <GlobalStyles />
    </>
  );
}

export default App;
