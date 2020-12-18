import React, { useState } from 'react';
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

const MessagesControl = (props) => {
  
  const [user, loading, error] = useAuthState(firebase.auth());
  const [blankPage, setBlankPage] = useState(false)

  if (blankPage) {
    return (
      <div>
        <h1>BlankPage</h1>
        <button onClick={()=>setBlankPage(!blankPage)}>Not Blank</button>
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
        <button onClick={()=>setBlankPage(!blankPage)}>Blank</button>
        <h1>{user.email}</h1>
        <SignOut />
        <hr />
        <NewMessageForm user={user} />
        <hr />
        <Chats setBlankPage={setBlankPage} user={user} />
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