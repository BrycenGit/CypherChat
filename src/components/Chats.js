import { useFirestore, isLoaded } from 'react-redux-firebase'
import React, { useState } from 'react';
import Message from './Message'
import { useCollectionData } from 'react-firebase-hooks/firestore';

function Chats(props) {
  const firestore = useFirestore(); 
  const {handleblankClick, handleSelectChat, currentUser} = props

  const usersRef = firestore.collection('users')
  const [usersList] = useCollectionData(usersRef, {idField: 'id'});

  const [recip, setRecip] = useState(null)
  const messagesRef = firestore.collection('messages').where("chat", "in",  [[currentUser.email, recip], [ recip, currentUser.email]] )
  const [messages] = useCollectionData(messagesRef, {idField: 'id'});
  
  const doSomething = (e) => {
    e.preventDefault()
    setRecip(e.target.recipient.value)
    handleSelectChat(e.target.recipient.value)
  }

  if ((isLoaded(usersList)) && (isLoaded(messages))) {
    const filteredUsers = usersList.filter(user => user.email !== currentUser.email)
    return (
      <>
      <h1>Chats</h1>
      <form onSubmit={doSomething}>
        
        {filteredUsers.map((user)=>{
          return (<div key={user.id}>
            <input name="recipient" type="radio" value={user.email} />
            <label htmlFor={user.email} >{user.email}</label>
            <br />
          </div>)
        })}

        <br />
        <button type="submit">Submit</button>
      </form>

      <button onClick={handleblankClick}>Blank</button>
      <h1>message List</h1>
        {messages && messages.map((msg) => {
          console.log('hello')
          return <Message user={currentUser} sender={msg.sender} recipient={msg.recipient} title={msg.title} body={msg.body} id={msg.id} key={msg.id} />
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
