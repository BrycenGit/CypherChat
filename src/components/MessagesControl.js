import React, { useReducer, useState } from 'react';
// import { withFirestore } from 'react-redux-firebase';
import firebase from '../firebase';
// import NewTodoForm from './NewTodoForm';
// import TodoList from './TodoList';
import NewMessageForm from './NewMessageForm';
import SignIn from './SignIn';
import SignOut from './SignOut';
import 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth';
import MessagesList from './MessagesList'
import Chats from './Chats';
import * as a from './../actions';
import blankPageReducer from '../reducers/blank-page-reducer'

const MessagesControl = (props) => {
  
  const [user, loading, error] = useAuthState(firebase.auth());
  // const [blankPage, setBlankPage] = useState(false)

  const [blankPage, dispatch] = useReducer(blankPageReducer)

  const handleblankClick = () => {
    dispatch({type: 'TOGGLE_BLANK'});
  }

  if (blankPage) {
    return (
      <div>
        <h1>BlankPage</h1>
        <button onClick={handleblankClick}>Not Blank</button>
      </div>
    )
  }
  if (loading) {
    return (
      <div>
      <p>Loading...</p>
      </div>
    )
  }
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    )
  }
  if (user) {
    console.log()
    return (
      <div>
        <button onClick={handleblankClick}>Blank</button>
        <h1>{user.email}</h1>
        <SignOut />
        <hr />
        <NewMessageForm user={user} />
        <hr />
        <Chats handleblankClick={handleblankClick} user={user} />
        <hr />
        <MessagesList user={user}/>
        {/* <NewTodoForm />
        <TodoList /> */}
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


// TodosControl = connect()(TodosControl)


export default MessagesControl;