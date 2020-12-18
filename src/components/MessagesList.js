import {useFirestore, isLoaded } from 'react-redux-firebase'
import Message from './Message';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import NewMessageForm from './NewMessageForm';


function MessagesList(props) {
  const firestore = useFirestore();
  const { user, recipientEmail } = props;
  const emailArray = [user.email, recipientEmail]
  const sortedEmails = emailArray.sort((a, b) => a.localeCompare(b))
  console.log(sortedEmails.join('-'))
  const messagesRef = firestore.collection('messages').where("chat", "array-contains",  sortedEmails.join('-') )

  // .orderBy('timeOpen').limit(10);
  const [messagesList] = useCollectionData(messagesRef, {idField: 'id'});

  if (isLoaded(messagesList)) {
    // messagesList.sort((a,b) => b.timeOpen - a.timeOpen);
    return (
      <>
      <NewMessageForm recipientEmail={recipientEmail} currentUser={user} />
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