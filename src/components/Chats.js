import { useFirestore, useFirestoreConnect, isLoaded } from 'react-redux-firebase'
import { useSelector } from 'react-redux'

function Chats(props) {
  
  const firestore = useFirestore();

  const { user } = props;

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
    return console.log(messages);
  }
  
  function selectChat(e) {
    e.preventDefault();
    const recipient = e.target.recipient.value
    return getMessages(recipient);
  }

  if (isLoaded(usersList)) {

    return (
      <>
      <h1>Chats</h1>
      <form onSubmit={selectChat}>
        
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