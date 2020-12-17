import React from 'react';
import { withFirestore } from 'react-redux-firebase';
import firebase from '../firebase';
import NewTodoForm from './NewTodoForm';
import TodoList from './TodoList';
import NewUserForm from './NewUserForm';
import NewMessageForm from './NewMessageForm';
import Profile from './Profile';
import SignIn from './SignIn';
import { useAuthState } from 'react-firebase-hooks/auth';
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
      console.log(user)
      return (
        <div>
          <h1>Hello World</h1>
          <SignIn />
          <Profile />
          <NewUserForm />
          <hr />
          <NewMessageForm />
          <hr />
          <NewTodoForm />
          <TodoList />
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