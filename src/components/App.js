import '../App.css';
import React from 'react';
import { Provider } from 'react-redux';
import rootReducer from '../reducers/index';
import firebase from '../firebase';
import { createStore } from 'redux';
import { createFirestoreInstance } from 'redux-firestore';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import Todos from './TodosControl.js'

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

function App() {
  
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Todos />
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}

export default App;

