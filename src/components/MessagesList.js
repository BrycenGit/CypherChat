import { useSelector } from 'react-redux'
import { useFirestore, useFirestoreConnect, isLoaded } from 'react-redux-firebase'
import Message from './Message';



function MessagesList(props) {
  const { user } = props;
  const firestore = useFirestore();
  useFirestoreConnect([{ 
    collection: 'messages'
  }])

  const messagesList = useSelector(state => state.firestore.ordered.messages);

  const getMessages = () => {
    firestore.collection("messages").get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log({id: doc.id, ...doc.data()});
      });
    });
  }

  getMessages()

  if (isLoaded(messagesList)) {
    console.log(messagesList)
    
    console.log('hello')
    // const myMessagesList = messagesList.filter(msg => msg.recipient === user.email)
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