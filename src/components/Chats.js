import { useFirestore, useFirestoreConnect, isLoaded } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import React, { useState } from 'react';
import Message from './Message'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import PropTypes from 'prop-types';

function Chats(props) {
  const {handleblankClick} = props
  const firestore = useFirestore();
  const { user } = props;
  const [chat, setChat] = useState([])
  
  const usersRef = firestore.collection('users')
  const [usersList] = useCollectionData(usersRef, {idField: 'id'});
  // useFirestoreConnect([{ 
  //   collection: 'users'
  // }])
  // const usersList = useSelector(state => state.firestore.ordered.users);
  const [recip, setRecip] = useState(null)

  const messagesRef = firestore.collection('messages').where("chat", "in",  [[user.email, recip], [ recip, user.email]] )
  const [messages] = useCollectionData(messagesRef, {idField: 'id'});
  
  // const getMessages = (recip) => {
  //   var messages = [];
  //   const messagesRef = firestore.collection('messages').where("chat", "in",  [[user.email, recip], [ recip, user.email]] )
  //   messagesRef.onSnapshot((q) => {
  //       q.forEach(function(doc) {
  //           messages.push(doc.data());
  //       });
  //   });
  //   return messages;
  // }
  
  // function selectChat(e) {
  //   e.preventDefault();
  //   const recipient = e.target.recipient.value
  //   return getMessages(recipient);
  // }
  const doSomething = (e) => {
    e.preventDefault()
    alert('clicked me')
    setRecip(e.target.recipient.value)
  }

  if ((isLoaded(usersList)) && (isLoaded(messages))) {
    console.log(chat)
    return (
      <>
      <h1>Chats</h1>
      <form onSubmit={doSomething}>
        
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

      <button onClick={props.handleblankClick}>Blank</button>
      <h1>message List</h1>
        {messages && messages.map((msg) => {
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

Chats.propTypes = {
  handleBlankClick: PropTypes.func
}