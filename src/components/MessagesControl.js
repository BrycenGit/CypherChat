import React, { useReducer } from 'react';
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
import { useCollectionData } from 'react-firebase-hooks/firestore';

const MessagesControl = () => { 
  const [user, loading, error] = useAuthState(firebase.auth());
  // console.log(user.email)

  const [blankPage, dispatch1] = useReducer(blankPageReducer)

  const [selectedChat, dispatch2] = useReducer(chatSelectionReducer)

  const handleSelectChat = (recipientEmail) => {
    dispatch2({type: 'SELECT_CHAT', recipient: recipientEmail})
  }

  const handleUnselectChat = () => {
    dispatch2({type: 'UNSELECT_CHAT'})
  }

  

  const handleblankClick = () => {
    dispatch1({type: 'TOGGLE_BLANK'});
  }


  
  if (selectedChat != null) {
    console.log(firebase.firestore())
    return (
      <div>
        <h1>chat page</h1>
        <button onClick={handleUnselectChat}>home</button>
        <Chats handleblankClick={handleblankClick} currentUser={user} handleSelectChat={handleSelectChat}/>
        
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
        <SignOut />
        <hr />
        <Chats handleblankClick={handleblankClick} currentUser={user} handleSelectChat={handleSelectChat} />
        <hr />
        <NewMessageForm currentUser={user} />
        <hr />
        {/* <MessagesList user={user}/> */}
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