import { isLoaded, useFirestore } from "react-redux-firebase";
import React, { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

const NewFriendForm = (props) => {
  const { currentUser, usersList } = props;
  const firestore = useFirestore();

  c;

  const pendingRequestsRef = firestore
    .collection("users")
    .doc(currentUser.uid)
    .collection("pendingRequests");

  const [pendingRequests] = useCollectionData(pendingRequestsRef);

  const [formValue, setFormValue] = useState("");
  const [matchedId, setMatchedId] = useState(null);

  const usersRef = firestore.collection("users");

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

  const findUserId = (userEmail) => {
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
    const selectedUserId = findUserId(e.target.recipientEmail.value);
    if (isLoaded(selectedUserId)) {
      console.log(selectedUserId);
    }
    setFormValue("");
  };

  const addFriend2 = (e) => {
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
