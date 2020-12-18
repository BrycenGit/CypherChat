import { useSelector } from 'react-redux'
import { useFirestore, useFirestoreConnect, isLoaded } from 'react-redux-firebase'
import Message from './Message';



function MessagesList(props) {
  const firestore = useFirestore();
  const { user } = props;

  useFirestoreConnect([{ 
    collection: 'messages'
  }])

  const messagesList = useSelector(state => state.firestore.data.messages);

  if (isLoaded(messagesList)) {
    return (
      <>
        <h1>message List</h1>
        {Object.values(messagesList).map((msg) => {
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

export default MessagesList;