import { useFirestore, useFirestoreConnect, isLoaded } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import React, { useState } from 'react';
import Message from './Message'

function Chats(props) {
  
  const firestore = useFirestore();
  const { user } = props;
  const [chat, setChat] = useState([])
  
  
  useFirestoreConnect([{ 
    collection: 'users'
  }])
  const usersList = useSelector(state => state.firestore.ordered.users);
  
  const messagesRef = firestore.collection('messages')
  const getMessages = (recip) => {
    var messages = [];
    messagesRef.where("chat", "in",  [[user.email, recip], [ recip, user.email]] )
    .onSnapshot((q) => {
        q.forEach(function(doc) {
            messages.push(doc.data());
        });
    });
    return messages;
  }
  
  function selectChat(e) {
    e.preventDefault();
    const recipient = e.target.recipient.value
    return getMessages(recipient);
  }

  if (isLoaded(usersList)) {
    console.log(chat)
    return (
      <>
      <h1>Chats</h1>
      <form onSubmit={(e)=> setChat(selectChat(e))}>
        
        {usersList.map((user)=>{
          return (<div key={user.id}>
            <input name="recipient" type="radio" value={user.email} />
            <label htmlFor={user.email} >{user.email}</label>
            <br />
          </div>)
        })}

        <br />
        <button type="submit">Submit</button>
      </form>
      <h1>message List</h1>
        {chat.map((msg) => {
          console.log('hello')
          return <Message user={user} sender={msg.sender} recipient={msg.recipient} title={msg.title} body={msg.body} id={msg.id} key={msg.id} />
        })}
      </>
    )
  } else {
    return (
      <>
        <p>Loading...</p>
      </>
    )
  }
}



export default Chats;