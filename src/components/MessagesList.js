import { useSelector } from 'react-redux'
import { useFirestore, useFirestoreConnect, isLoaded } from 'react-redux-firebase'
import Message from './Message';



function MessagesList(props) {
  const { user } = props;
  const firestore = useFirestore();
  useFirestoreConnect([{ 
    collection: 'messages'
  }])

  const messagesList = useSelector(state => state.firestore.data.messages);

  const getMessages = () => {
    var messages = [];
    firestore.collection("messages").where("sender", "==", user.email)
    .onSnapshot((q) => {
        
        q.forEach(function(doc) {
            messages.push(doc.data());
        });
    });
    return console.log(messages);
  }

  if (isLoaded(messagesList)) {
    // const myMessagesList = messagesList.filter(msg => msg.recipient === user.email)
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