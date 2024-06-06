import ErrorBoundary from 'components/ErrorBoundary';
import { Navbar } from 'components/Navbar';
import { SearchSection } from 'components/SearchSection';
import { paths } from 'constants/paths';
import { RoutesArr } from 'constants/routes';
import { onValue, ref, set } from 'firebase/database';
import { db } from 'firebaseConfig/firebase';
import { setUpRecaptcha } from 'helpers/setUpRecaptcha';
import { StateInterface } from 'interface';
import Messages from 'pages/Messages';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useMatch, useNavigate } from 'react-router-dom';
import GlobalStyles from 'theme/globalStyles';

import { setMessagesAction, setPostsAction, setUserDataAction, setUsersAction } from '../../index';
import { configApp } from './config';
import { AppContainer, Loader, MainContent } from './styled';

const { homepage, signup, feed } = paths;
const { googleProviderUrl } = configApp;

function App() {
  const auth = useSelector((state: StateInterface) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, loading] = useAuthState(auth);
  const [isFetchingData, setIsFetchingData] = useState(true);

  const isSingnupPage = useMatch(signup);

  const isUserNotVerifyPhoneWithoutUsingGoogle =
    user &&
    !user.phoneNumber &&
    user.providerData[0].providerId !== googleProviderUrl &&
    !isSingnupPage;

  if (isUserNotVerifyPhoneWithoutUsingGoogle) {
    user.delete();
  }

  const dbUserReference = ref(db, `users`);
  const dbPostsReference = ref(db, `tweets`);
  const dbMessagesReference = ref(db, `messages`);

  const updateLastOnline = () => {
    if (!user) return;
    console.log('updated');
    set(ref(db, `users/${user.uid}/lastOnline`), Date.now());
  };

  useEffect(() => {
    onValue(dbUserReference, (snapshot) => {
      if (snapshot.exists()) {
        const usersInfo = snapshot.val();
        if (typeof usersInfo === 'object') {
          dispatch(setUsersAction(Object.values(usersInfo)));
          setIsFetchingData(false);
        }
      }
    });

    onValue(dbPostsReference, (snapshot) => {
      if (snapshot.exists()) {
        const postInfo = snapshot.val();

        if (typeof postInfo === 'object') {
          dispatch(setPostsAction(postInfo));
        }
      }
    });
  });

  onValue(dbMessagesReference, (snapshot) => {
    if (snapshot.exists()) {
      const messageInfo = snapshot.val();
      if (typeof messageInfo === 'object') {
        dispatch(setMessagesAction(Object.values(messageInfo)));
      }
    }
  });

  useEffect(() => {
    setUpRecaptcha();
  }, []);

  useEffect(() => {
    if (user && !user.phoneNumber && user.providerData[0].providerId !== googleProviderUrl) return;
    if (!user) {
      navigate(homepage);
    } else {
      const dbUserReference = ref(db, `users/${user.uid}`);

      onValue(dbUserReference, (snapshot) => {
        if (snapshot.exists()) {
          const userInfo = snapshot.val();
          dispatch(setUserDataAction(userInfo));
        }
      });
      setInterval(updateLastOnline, 10000);
      navigate(feed);
    }
  }, [user, loading]);

  return (
    <ErrorBoundary>
      <div id="recaptcha-container"></div>
      <AppContainer>
        {user && user.email && !isFetchingData && <Navbar />}
        <MainContent>
          {loading || isFetchingData ? (
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
              <Route path="/messages" element={<Messages />} />
            </Routes>
          )}
        </MainContent>
        {user && user.email && !isFetchingData && <SearchSection />}

        <GlobalStyles />
      </AppContainer>
    </ErrorBoundary>
  );
}

export default App;
