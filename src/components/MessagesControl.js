import React, { useState } from "react";
import "firebase/auth";
import SelectedChat from "./SelectedChat";
import FriendRequests from "./FriendRequests";

import { useCollectionData } from "react-firebase-hooks/firestore";
import { useFirestore, isLoaded } from "react-redux-firebase";
import Header from "./Header";
import styled from "styled-components";
import HomePage from "./HomePage";

const MessagesControl = (props) => {
  const { user } = props;

  const firestore = useFirestore();
  const pendingRequestsRef = firestore
    .collection("users")
    .doc(user.uid)
    .collection("pendingRequests");

  const [pendingRequests] = useCollectionData(pendingRequestsRef);

  const [recipient, setRecipient] = useState(null);
  const [requestsPage, setRequestsPage] = useState(false);
  let currentState = null;

  const usersRef = firestore.collection("users");
  const [usersList] = useCollectionData(usersRef, { idField: "id" });

  const friendsRef = firestore
    .collection("users")
    .doc(user.uid)
    .collection("friends");
  const [friendsList] = useCollectionData(friendsRef, { idField: "id" });

  const resetPage = () => {
    setRecipient(null);
    setRequestsPage(false);
  };

  const toggleRequests = () => {
    setRecipient(null);
    setRequestsPage(!requestsPage);
  };

  const handleSelectChat = (recipientEmail) => {
    setRequestsPage(false);
    setRecipient(recipientEmail);
  };

  const handleUnselectChat = () => {
    setRecipient(null);
  };

  if (recipient != null) {
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
    currentState = (
      <>
        <HomePage />
      </>
    );
  }
  if (isLoaded(pendingRequests) && isLoaded(friendsList)) {
    return (
      <Page>
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
      </Page>
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

const Page = styled.div`
  height: 100vh;
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: black;
  height: 100%;
  padding-top: 100px;
`;

const Item = styled.div`
  position: fixed;
  width: 100%;
`;
