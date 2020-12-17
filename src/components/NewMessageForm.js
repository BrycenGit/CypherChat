import { useFirestore, useFirestoreConnect, isLoaded } from 'react-redux-firebase'
import { useSelector } from 'react-redux'

function NewMessageForm(props) {
  
  const firestore = useFirestore();

  const { user } = props;

  useFirestoreConnect([{ 
    collection: 'users'
  }])

  const usersList = useSelector(state => state.firestore.ordered.users);

  const messagesRef = firestore.collection('messages')

  function getUsers() {
    firestore.collection("users").get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
      });
    });
    return console.log('hello')
  }

  function addMessageToFirestore(e) {
    e.preventDefault();
    
    return messagesRef.add(
      {
        title: e.target.title.value,
        body: e.target.body.value,
        chat: [user.email, e.target.recipientEmail.value],
        sender: user.email,
        recipient: e.target.recipientEmail.value,
        timeOpen: firestore.FieldValue.serverTimestamp()
        
      }
    )
  }
  if (isLoaded(usersList)) {
    return (
      <>
      <h1>New Message Form</h1>
      <form onSubmit={addMessageToFirestore}>
        <label htmlFor="title">Title</label>
        <input name="title" type="text" />
        <br />
        <label htmlFor="body">Body</label>
        <input name="body" type="text" />
        <br />
        <label htmlFor="recipientEmail">Recipient Email</label>
        {/* <input name="recipientEmail" type="text" /> */}
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



export default NewMessageForm;
