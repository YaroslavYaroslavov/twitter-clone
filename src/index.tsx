import { auth, db, dbUserReference } from 'firebaseConfig/firebase';
import { Action, PostInterface, StateInterface, UserInfo } from 'interface';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { legacy_createStore as createStore } from 'redux';

import App from './components/App';

export const SET_USER_DATA = 'SET_USER_DATA';
export const SET_USERS = 'SET_USERS';
export const SET_POSTS = 'SET_POSTS';

export const setUserDataAction = (userData: UserInfo) => ({
  type: SET_USER_DATA,
  payload: userData,
}); 
// asdasd
export const setPostsAction = (posts: { userId: PostInterface }) => ({
  type: SET_POSTS,
  payload: posts,
});

export const setUsersAction = (users: UserInfo[]) => ({
  type: SET_USERS,
  payload: users,
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
    default:
      return state;
  }
};

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
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
