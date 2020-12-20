import { useFirestore } from "react-redux-firebase";
import React from "react";
const NewFriendForm = (props) => {
  const { currentUser, usersList } = props;
  const firestore = useFirestore();
  const currentUserRef = firestore
    .collection("users")
    .doc(currentUser.uid)
    .collection("pendingRequests");

  const addFriend = async (e) => {
    e.preventDefault();
    // await currentUserRef.doc(e.target.recipientEmail.value).set({
    //   email: e.target.recipientEmail.value,
    // });
    await console.log(e.target.user.value);
  };

  console.log(usersList);
  return (
    <>
      <form onSubmit={addFriend}>
        {usersList.map((user) => {
          return (
            <div>
              <input type="checkbox" value={user} name="user[]" />
              <label htmlFor="user">{user.username}</label>
            </div>
          );
        })}
        <input name="recipientEmail" type="text" placeholder="friends email" />
        <button type="Submit">Send Request</button>
      </form>
    </>
  );
};

export default NewFriendForm;
