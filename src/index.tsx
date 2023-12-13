import { auth, firestore } from 'firebaseConfig/firebase';
import { StateInterface } from 'interface';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { legacy_createStore as createStore } from 'redux';

import App from './components/App';

const defaultState: StateInterface = {
  auth,
  firestore,
};

const reducer = (state = defaultState, action: { type: string; payload?: object }) => {
  switch (action.type) {
    default:
      return state;
  }
};

const store = createStore(reducer);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
  </React.StrictMode>
);
