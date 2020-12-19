import { useFirestore } from "react-redux-firebase";

const NewFriendForm = (props) => {
  const {currentUser} = props;
  const currentUserRef = firestore.collection(currentUser.uid);

  const addFriend = async e => {
    e.preventDefault();
    await 
  }

  return (
    <>
      <form onSubmit={addFriend}>
        <input name='recipientEmail' type='text' placeholder='friends email'/>
        <button type='Submit'>Send Request</button>
      </form>

    </>
  )
};

export default NewFriendForm;
