import { useFirestore, useFirestoreConnect, isLoaded } from 'react-redux-firebase'
import { useSelector } from 'react-redux'

function NewMessageForm(props) {
  
  const firestore = useFirestore();

  const { currentUser, recipientEmail } = props;

  useFirestoreConnect([{ 
    collection: 'users'
  }])

  const messagesRef = firestore.collection('messages')

  function addMessageToFirestore(e) {
    e.preventDefault();
    return messagesRef.add(
      {
        title: e.target.title.value,
        body: e.target.body.value,
        chat: [currentUser.email, recipientEmail],
        sender: currentUser.email,
        recipient: recipientEmail,
        timeOpen: firestore.FieldValue.serverTimestamp()
      }
    )
  }
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
        <button type="submit">Submit</button>
      </form>
      </>
    )
}

export default NewMessageForm;