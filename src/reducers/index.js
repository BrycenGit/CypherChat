import { combineReducers } from 'redux';
// import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore'
import {blankPageReducer} from './blank-page-reducer'
import {chatSelectionReducer} from './chat-selection-reducer'

// Add firebase to reducers
const rootReducer = combineReducers({
  blankPage: blankPageReducer,
  selectedChat: chatSelectionReducer,
  // firebase: firebaseReducer,
  firestore: firestoreReducer
})

export default rootReducer;