import '../App.css';
import React from 'react';
import MessagesControl from './MessagesControl.js'
import SignIn from './SignIn'
import SignOut from './SignOut'
import firebase from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function App() {
  const auth = firebase.auth()
  const [user] = useAuthState(auth);
  
  return (
    <div className='App'>
      <header>
        <h1>👽👾🤖</h1><SignOut />
      </header>
      <section>
        {user ? <MessagesControl user={user} /> : <SignIn />}
      </section>
    </div>
    
  );
}

export default App;

