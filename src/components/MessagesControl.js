import React, { useReducer, useState } from 'react';
import firebase from '../firebase';
import { useFirestore, isLoaded } from 'react-redux-firebase'
import NewMessageForm from './NewMessageForm';
import SignIn from './SignIn';
import SignOut from './SignOut';
import 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth';
import MessagesList from './MessagesList'
import Chats from './Chats';
// import * as a from './../actions';
import {blankPageReducer} from '../reducers/blank-page-reducer'
import {chatSelectionReducer} from '../reducers/chat-selection-reducer'
// import { useCollectionData } from 'react-firebase-hooks/firestore';

const MessagesControl = () => { 
  const [user, loading, error] = useAuthState(firebase.auth());
  // console.log(user.email)

  const [blankPage, dispatch1] = useReducer(blankPageReducer)

  const [selectedChat, dispatch2] = useReducer(chatSelectionReducer)

  const [recipient, setRecipient] = useState(null)

  const handleSelectChat = (recipientEmail) => {
    setRecipient(recipientEmail);
    dispatch2({type: 'SELECT_CHAT', recipient: recipientEmail})
  }

  const handleUnselectChat = () => {
    setRecipient(null)
    dispatch2({type: 'UNSELECT_CHAT'})
  }

  const handleblankClick = () => {
    dispatch1({type: 'TOGGLE_BLANK'});
  }


  
  if (selectedChat != null) {
    return (
      <div>
        <h1>chat page</h1>
        <button onClick={handleUnselectChat}>home</button>
        <MessagesList user={user} recipientEmail={recipient}/>
      </div>
    )
  } else if (blankPage) {
    return (
      <div>
        <h1>BlankPage</h1>
        <button onClick={handleblankClick}>Not Blank</button>
      </div>
    )
  } else if (loading) {
    return (
      <div>
      <p>Loading...</p>
      </div>
    )
  } else if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    )
  } else if (user) {
    console.log()
    return (
      <div>
        <h1>{user.email}</h1>
        <Chats handleblankClick={handleblankClick} currentUser={user} handleSelectChat={handleSelectChat} />
        <hr />
        <NewMessageForm currentUser={user} handleSelectChat={handleSelectChat}/>
        <hr />
      </div>
    )
  } else {
    return (
      <div>
        <SignIn />
      </div>
    )
  }  
}

export default MessagesControl;