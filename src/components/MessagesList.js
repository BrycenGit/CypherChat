import {useFirestore, isLoaded } from 'react-redux-firebase'
import Message from './Message';
import { useCollectionData } from 'react-firebase-hooks/firestore';


function MessagesList(props) {
  const firestore = useFirestore();
  const { user, recipientEmail } = props;

  const messagesRef = firestore.collection('messages').where("chat", "in",  [[user.email, recipientEmail], [ recipientEmail, user.email]] )
  // .orderBy('timeOpen').limit(10);
  const [messagesList] = useCollectionData(messagesRef, {idField: 'id'});

  if (isLoaded(messagesList)) {
    return (
      <>
        <h1>message List</h1>
        {messagesList && messagesList.map((msg) => {
          return (<div key={msg.id}>
           <Message user={user} sender={msg.sender} recipient={msg.recipient} title={msg.title} body={msg.body} id={msg.id} key={msg.id} />
          </div>)
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

export default MessagesList;