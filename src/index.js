import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import 'firebase/database';
import rootReducer from './reducers/index';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { Provider } from 'react-redux';
import firebase from './firebase';
import { createFirestoreInstance } from 'redux-firestore';
import { createStore } from 'redux';

const rrfConfig = {
  userProfile: 'users',
  useFireStoreForProfile: true,
}

// const initialState = {}

const store = createStore(rootReducer)

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
}


ReactDOM.render(
  <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <App />
      </ReactReduxFirebaseProvider>
    </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
