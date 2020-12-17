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

  const getMessages = () => {
    var messages = [];
    messagesRef.where("chat", "in",  [[user.email, 'nicolescj@aol.com'], [ 'nicolescj@aol.com', user.email]] )
    .onSnapshot((q) => {
        
        q.forEach(function(doc) {
            messages.push(doc.data());
        });
    });
    return console.log(messages);
  }
  
  function selectChat(e) {
    e.preventDefault();
    return console.log(e.target.email.value)
  }

  if (isLoaded(usersList)) {
    getMessages();
    return (
      <>
      <h1>Chats</h1>
      <form onSubmit={selectChat}>
        
        {usersList.map((user)=>{
          return (<div key={user.id}>
            <input name="recipientEmail" type="radio" value={user.email} />
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