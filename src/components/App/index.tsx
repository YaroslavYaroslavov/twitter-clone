import ErrorBoundary from 'components/ErrorBoundary';
import { paths } from 'constants/paths';
import { RoutesArr } from 'constants/routes';
import { setUpRecaptcha } from 'helpers/setUpRecaptcha';
import { StateInterface } from 'interface';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useSelector } from 'react-redux';
import { Route, Routes, useMatch, useNavigate } from 'react-router-dom';
import GlobalStyles from 'theme/globalStyles';

import { configApp } from './config';
import { Loader } from './styled';

const { homepage, signup, feed } = paths;
const { googleProviderUrl } = configApp;

function App() {
  const auth = useSelector((state: StateInterface) => state.auth);
  const navigate = useNavigate();

  const [user, loading] = useAuthState(auth);

  const isSingnupPage = useMatch(signup);

  const isUserNotVerifyPhoneWithoutUsingGoogle =
    user &&
    !user.phoneNumber &&
    user.providerData[0].providerId !== googleProviderUrl &&
    !isSingnupPage;

  if (isUserNotVerifyPhoneWithoutUsingGoogle) {
    user.delete();
  }

  useEffect(() => {
    setUpRecaptcha();
  }, []);

  useEffect(() => {
    if (user && !user.phoneNumber && user.providerData[0].providerId !== googleProviderUrl) return;
    if (!user) {
      navigate(homepage);
    } else {
      navigate(feed);
    }
  }, [user]);

  return (
    <ErrorBoundary>
      <>
        <div id="recaptcha-container"></div>
        {loading ? (
          <Loader />
        ) : (
          <Routes>
            {RoutesArr.map(
              ({ pathname, element, logged }) =>
                !logged && <Route key={pathname} path={pathname} element={element} />
            )}
            {user &&
              user.email &&
              RoutesArr.map(
                ({ pathname, element, logged }) =>
                  logged && <Route key={pathname} path={pathname} element={element} />
              )}
          </Routes>
        )}
        <GlobalStyles />
      </>
    </ErrorBoundary>
  );
}

export default App;
