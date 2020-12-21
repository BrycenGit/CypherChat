import React, { useState } from "react";
import "firebase/auth";
import SelectedChat from "./SelectedChat";
import FriendRequests from "./FriendRequests";

import { useCollectionData } from "react-firebase-hooks/firestore";
import { useFirestore, isLoaded } from "react-redux-firebase";
import Header from "./Header";
import styled from "styled-components";

const MessagesControl = (props) => {
  const { user } = props;

  const firestore = useFirestore();
  const pendingRequestsRef = firestore
    .collection("users")
    .doc(user.uid)
    .collection("pendingRequests");

  const [pendingRequests] = useCollectionData(pendingRequestsRef);

  const [recipient, setRecipient] = useState(null);
  // const [secretPage, setSecretPage] = useState(false);
  const [requestsPage, setRequestsPage] = useState(false);
  let currentState = null;

  const usersRef = firestore.collection("users");
  const [usersList] = useCollectionData(usersRef, { idField: "id" });

  const friendsRef = firestore
    .collection("users")
    .doc(user.uid)
    .collection("friends");
  // .where("email", "!=", currentUser.email);
  const [friendsList] = useCollectionData(friendsRef, { idField: "id" });

  console.log(usersList);

  const resetPage = () => {
    setRecipient(null);
    setRequestsPage(false);
  };

  const toggleRequests = () => {
    setRequestsPage(!requestsPage);
  };

  const handleSelectChat = (recipientEmail) => {
    setRecipient(recipientEmail);
  };

  // const toggleSecret = () => {
  //   setSecretPage(!secretPage);
  // };

  const handleUnselectChat = () => {
    setRecipient(null);
  };

  if (recipient != null) {
    console.log(recipient);
    currentState = (
      <SelectedChat
        user={user}
        recipientEmail={recipient}
        handleUnselectChat={handleUnselectChat}
      />
    );
  } else if (requestsPage) {
    currentState = (
      <FriendRequests
        pendingRequests={pendingRequests}
        currentUser={user}
        toggleRequests={toggleRequests}
      />
    );
  } else {
    currentState = <></>;
  }
  if (isLoaded(pendingRequests) && isLoaded(friendsList)) {
    return (
      <>
        <Item>
          <Header
            toggleRequests={toggleRequests}
            pendingRequestsCount={pendingRequests.length}
            resetPage={resetPage}
            currentUser={user}
            friendsList={friendsList}
            handleSelectChat={handleSelectChat}
            usersList={usersList}
          />
        </Item>
        <Container>{currentState}</Container>
      </>
    );
  } else {
    return (
      <>
        <p>Loading...</p>
      </>
    );
  }
};

export default MessagesControl;

const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: blue;
  /* align-items: center; */
  /* align-self: center; */

  /* flex-direction: column; */

  max-width: 100%;
  min-height: 90vh;
`;

const Item = styled.div`
  /* min-width: 750px; */
  /* width: 100%; */
`;
