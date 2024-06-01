import { auth, db, dbUserReference } from 'firebaseConfig/firebase';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { legacy_createStore as createStore } from 'redux';
import App from './components/App';
export const SET_USER_DATA = 'SET_USER_DATA';
export const SET_USERS = 'SET_USERS';
export const SET_POSTS = 'SET_POSTS';
export const setUserDataAction = (userData) => ({
    type: SET_USER_DATA,
    payload: userData,
});
export const setPostsAction = (posts) => ({
    type: SET_POSTS,
    payload: posts,
});
export const setUsersAction = (users) => ({
    type: SET_USERS,
    payload: users,
});
const defaultState = {
    auth,
    db,
    dbUserReference,
    posts: {},
};
const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return Object.assign(Object.assign({}, state), { userInfo: action.payload });
        case SET_USERS:
            return Object.assign(Object.assign({}, state), { users: action.payload });
        case SET_POSTS:
            return Object.assign(Object.assign({}, state), { posts: action.payload });
        default:
            return state;
    }
};
const store = createStore(reducer
// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(React.StrictMode, null,
    React.createElement(HashRouter, null,
        React.createElement(Provider, { store: store },
            React.createElement(App, null)))));
