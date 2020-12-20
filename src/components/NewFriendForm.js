import { useFirestore } from "react-redux-firebase";
import React from "react";
const NewFriendForm = (props) => {
  const { currentUser, usersList } = props;
  const firestore = useFirestore();
  const currentUserRef = firestore
    .collection("users")
    .doc(currentUser.uid)
    .collection("pendingRequests");

  const checkForUser = (usersEmail) => {
    console.log(usersEmail);
    const array = usersList.filter((user) => user.email === usersEmail);
    console.log(usersList);
    if (array.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  // const addFriend = async (e) => {
  //   e.preventDefault();
  //   await currentUserRef.doc(e.target.recipientEmail.value).set({
  //     email: e.target.recipientEmail.value,
  //   });
  // };

  const addFriend = (e) => {
    e.preventDefault();
    if (checkForUser(e.target.recipientEmail.value)) {
      // currentUserRef.doc(e.target.recipientEmail.value).set({
      //   email: e.target.recipientEmail.value,
      // });
      console.log("true");
    } else {
      console.log("false");
    }
  };

  console.log(usersList);
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
