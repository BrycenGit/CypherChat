import { useFirestore } from "react-redux-firebase";
import React, { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

const NewFriendForm = (props) => {
  const { currentUser, usersList } = props;
  const firestore = useFirestore();
  const pendingRequestsRef = firestore
    .collection("users")
    .doc(currentUser.uid)
    .collection("pendingRequests");

  const [pendingRequests] = useCollectionData(pendingRequestsRef);
  console.log(pendingRequests);

  const [formValue, setFormValue] = useState("");

  const checkForPendingRequests = (usersEmail) => {
    const array = pendingRequests.filter((user) => user.email === usersEmail);
    console.log(array);
    if (array.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const checkForUser = (usersEmail) => {
    const array = usersList.filter((user) => user.email === usersEmail);
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
    const input = e.target.recipientEmail.value;
    if (checkForUser(input) && !checkForPendingRequests(input)) {
      pendingRequestsRef.doc(e.target.recipientEmail.value).set({
        email: e.target.recipientEmail.value,
      });
      console.log("friend requested");
    } else {
      console.log("friend not requested");
    }
    setFormValue("");
  };
  return (
    <>
      <form onSubmit={addFriend}>
        <input
          name="recipientEmail"
          value={formValue}
          onChange={(e1) => {
            setFormValue(e1.target.value);
            console.log(formValue);
          }}
        />
        <button className="request" type="Submit">
          Send Request
        </button>
      </form>
    </>
  );
};

export default NewFriendForm;
