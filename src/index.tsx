import { auth, db, dbUserReference } from 'firebaseConfig/firebase';
import { Action, PostInterface, StateInterface, UserInfo } from 'interface';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { compose, legacy_createStore as createStore } from 'redux';

import App from './components/App';

export const SET_USER_DATA = 'SET_USER_DATA';
export const SET_USERS = 'SET_USERS';
export const SET_POSTS = 'SET_POSTS';
export const SET_MESSAGES = 'SET_MESSAGES';

export const setUserDataAction = (userData: UserInfo) => ({
  type: SET_USER_DATA,
  payload: userData,
});

export const setPostsAction = (posts: { userId: PostInterface }) => ({
  type: SET_POSTS,
  payload: posts,
});

export const setUsersAction = (users: UserInfo[]) => ({
  type: SET_USERS,
  payload: users,
});

export const setMessagesAction = (massages) => ({
  type: SET_MESSAGES,
  payload: massages,
});

const defaultState: StateInterface = {
  auth,
  db,
  dbUserReference,
  posts: {},
};

const reducer = (state = defaultState, action: Action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return { ...state, userInfo: action.payload };
    case SET_USERS:
      return { ...state, users: action.payload };
    case SET_POSTS:
      return { ...state, posts: action.payload };
    case SET_MESSAGES:
      return { ...state, massages: action.payload};
    default:
      return state;
  }
};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancers()
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
  </React.StrictMode>
);
