import { useFirestore } from 'react-redux-firebase'

const currentUserEmail = 'brycenbartolome@gmail.com'

function NewMessageForm(props) {
  console.log(props)

  const firestore = useFirestore();
  const messagesRef = firestore.collection('messages')

  function addMessageToFirestore(e) {
    e.preventDefault();
    
    return messagesRef.add(
      {
        title: e.target.title.value,
        body: e.target.body.value,
        sender: currentUserEmail,
        recipient: e.target.recipientEmail.value,
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
      <label htmlFor="recipientEmail">Recipient Email</label>
      <input name="recipientEmail" type="text" />
      <br />
      <button type="submit">Submit</button>
    </form>
    </>
  )
}



export default NewMessageForm;
