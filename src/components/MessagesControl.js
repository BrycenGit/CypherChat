import React from 'react';
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


const MessagesControl = () => {
  
  const [user, loading, error] = useAuthState(firebase.auth());

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
    return (
      <div>
        <SignOut />
        <hr />
        <NewMessageForm user={user} />
        <hr />
        <Chats user={user} />
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