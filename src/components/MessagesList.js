import { useSelector } from 'react-redux'
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase'
import Message from './Message';



function MessagesList(props) {
  const { user } = props;

  useFirestoreConnect([{ 
    collection: 'messages'
  }])

  const messagesList = useSelector(state => state.firestore.ordered.messages);

  if (isLoaded(messagesList)) {

    const myMessagesList = messagesList.filter(msg => msg.recipient === user.email)
    return (
      <>
        <h1>message List</h1>
        {messagesList.map((msg) => {
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