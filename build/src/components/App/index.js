import ErrorBoundary from 'components/ErrorBoundary';
import { Navbar } from 'components/Navbar';
import { SearchSection } from 'components/SearchSection';
import { paths } from 'constants/paths';
import { RoutesArr } from 'constants/routes';
import { onValue, ref } from 'firebase/database';
import { db } from 'firebaseConfig/firebase';
import { setUpRecaptcha } from 'helpers/setUpRecaptcha';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useMatch, useNavigate } from 'react-router-dom';
import GlobalStyles from 'theme/globalStyles';
import { setPostsAction, setUserDataAction, setUsersAction } from '../../index';
import { configApp } from './config';
import { AppContainer, Loader, MainContent } from './styled';
const { homepage, signup, feed } = paths;
const { googleProviderUrl } = configApp;
function App() {
    const auth = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [user, loading] = useAuthState(auth);
    const [isFetchingData, setIsFetchingData] = useState(true);
    const isSingnupPage = useMatch(signup);
    const isUserNotVerifyPhoneWithoutUsingGoogle = user &&
        !user.phoneNumber &&
        user.providerData[0].providerId !== googleProviderUrl &&
        !isSingnupPage;
    if (isUserNotVerifyPhoneWithoutUsingGoogle) {
        user.delete();
    }
    const dbUserReference = ref(db, `users`);
    const dbPostsReference = ref(db, `tweets`);
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
    useEffect(() => {
        setUpRecaptcha();
    }, []);
    useEffect(() => {
        if (user && !user.phoneNumber && user.providerData[0].providerId !== googleProviderUrl)
            return;
        if (!user) {
            navigate(homepage);
        }
        else {
            const dbUserReference = ref(db, `users/${user.uid}`);
            onValue(dbUserReference, (snapshot) => {
                if (snapshot.exists()) {
                    const userInfo = snapshot.val();
                    dispatch(setUserDataAction(userInfo));
                }
            });
            navigate(feed);
        }
    }, [user, loading]);
    console.log(user);
    return (React.createElement(ErrorBoundary, null,
        React.createElement("div", { id: "recaptcha-container" }),
        React.createElement(AppContainer, null,
            user && user.email && !isFetchingData && React.createElement(Navbar, null),
            React.createElement(MainContent, null, loading || isFetchingData ? (React.createElement(Loader, null)) : (React.createElement(Routes, null,
                RoutesArr.map(({ pathname, element, logged }) => !logged && React.createElement(Route, { key: pathname, path: pathname, element: element })),
                user &&
                    user.email &&
                    RoutesArr.map(({ pathname, element, logged }) => logged && React.createElement(Route, { key: pathname, path: pathname, element: element }))))),
            user && user.email && !isFetchingData && React.createElement(SearchSection, null),
            React.createElement(GlobalStyles, null))));
}
export default App;
