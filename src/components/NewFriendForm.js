import { useFirestore } from "react-redux-firebase";

const NewFriendForm = (props) => {
  const { currentUser } = props;
  const firestore = useFirestore();
  const currentUserRef = firestore
    .collection("users")
    .doc(currentUser.uid)
    .collection("pendingRequests");

  const addFriend = async (e) => {
    e.preventDefault();
    await currentUserRef.doc(e.target.recipientEmail.value).set({
      email: e.target.recipientEmail.value,
    });
  };

  return (
    <>
      <form onSubmit={addFriend}>
        <input name="recipientEmail" type="text" placeholder="friends email" />
        <button type="Submit">Send Request</button>
      </form>
    </>
  );
};

export default NewFriendForm;
