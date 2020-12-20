import { isLoaded, useFirestore } from "react-redux-firebase";
import React, { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

const NewFriendForm = (props) => {
  const { currentUser, usersList } = props;
  const firestore = useFirestore();

  const sentRequestsRef = firestore
    .collection("users")
    .doc(currentUser.uid)
    .collection("sentRequests");

  const [sentRequests] = useCollectionData(sentRequestsRef);

  const myPendingRequestsRef = firestore
    .collection("users")
    .doc(currentUser.uid)
    .collection("pendingRequests");

  const [myPendingRequests] = useCollectionData(myPendingRequestsRef);

  const [formValue, setFormValue] = useState("");
  const [matchedId, setMatchedId] = useState(null);

  const usersRef = firestore.collection("users");

  const checkForMyPendingRequests = (usersEmail) => {
    const array = myPendingRequests.filter((user) => user.email === usersEmail);
    console.log(array);
    if (array.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const checkForSentRequests = (usersEmail) => {
    const array = sentRequests.filter((user) => user.email === usersEmail);
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

  const addToOtherUsersPendingRequest = (userEmail) => {
    usersRef
      .where("email", "==", userEmail)
      .get()
      .then((snap) => {
        snap.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
          setMatchedId(doc.id);
          usersRef
            .doc(doc.id)
            .collection("pendingRequests")
            .doc(currentUser.email)
            .set({
              email: currentUser.email,
              id: currentUser.uid,
            });
        });
      });
  };

  const addFriend = (e) => {
    e.preventDefault();
    const selectedUserId = addToOtherUsersPendingRequest(
      e.target.recipientEmail.value
    );
    if (isLoaded(selectedUserId)) {
      console.log(selectedUserId);
    }
    setFormValue("");
  };

  const addFriend2 = (e) => {
    e.preventDefault();
    const input = e.target.recipientEmail.value;
    if (
      checkForUser(input) &&
      !checkForMyPendingRequests(input) &&
      !checkForSentRequests(input)
    ) {
      addToOtherUsersPendingRequest(input);
      sentRequestsRef.doc(input).set({
        email: input,
      });
      alert("friend requested");
    } else {
      alert("friend not requested");
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
