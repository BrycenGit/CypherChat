import { useFirestore } from "react-redux-firebase";
import React, { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Form, FormControl, Button } from "react-bootstrap";

const NewFriendForm = (props) => {
  const { currentUser, usersList, friendsList } = props;
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
  const checkForFriend = (usersEmail) => {
    const array = friendsList.filter((user) => user.email === usersEmail);
    if (array.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const addToOtherUsersPendingRequest = (userEmail) => {
    usersRef
      .where("email", "==", userEmail)
      .get()
      .then((snap) => {
        snap.forEach(function (doc) {
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

  const checkIfImUser = (userEmail) => {
    if (currentUser.email === userEmail) {
      return true;
    } else {
      return false;
    }
  };

  const addFriend = (e) => {
    e.preventDefault();
    const input = e.target.recipientEmail.value;
    if (
      !checkIfImUser(input) &&
      checkForUser(input) &&
      !checkForMyPendingRequests(input) &&
      !checkForSentRequests(input) &&
      !checkForFriend(input)
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
      <Form onSubmit={addFriend} inline>
        <FormControl
          name="recipientEmail"
          value={formValue}
          onChange={(e1) => {
            setFormValue(e1.target.value);
            console.log(formValue);
          }}
          placeholder="Add Friend by Email"
          className="mr-sm-2"
        />
        <Button type="submit" variant="outline-light">
          Add Friend
        </Button>
      </Form>
    </>
  );
};

export default NewFriendForm;
