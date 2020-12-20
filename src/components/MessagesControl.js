import React, { useState } from "react";
import "firebase/auth";
import ChatSelector from "./ChatSelector";
import SecretPage from "./SecretPage";
import SelectedChat from "./SelectedChat";
import FriendRequests from "./FriendRequests";
// import { useCollectionData } from "react-firebase-hooks/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useFirestore, isLoaded } from "react-redux-firebase";
import Header from "./Header";

const MessagesControl = (props) => {
  const { user } = props;

  const firestore = useFirestore();
  const pendingRequestsRef = firestore
    .collection("users")
    .doc(user.uid)
    .collection("pendingRequests");

  const [pendingRequests] = useCollectionData(pendingRequestsRef);

  const [recipient, setRecipient] = useState(null);
  const [secretPage, setSecretPage] = useState(false);
  const [requestsPage, setRequestsPage] = useState(false);
  let currentState = null;

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

  const toggleSecret = () => {
    setSecretPage(!secretPage);
  };

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
  } else if (secretPage) {
    currentState = <SecretPage toggleSecret={toggleSecret} />;
  } else if (requestsPage) {
    currentState = (
      <FriendRequests
        pendingRequests={pendingRequests}
        currentUser={user}
        toggleRequests={toggleRequests}
      />
    );
  } else {
    if (isLoaded(pendingRequests)) {
      currentState = (
        <>
          <button className="requestToggle" onClick={toggleRequests}>
            Friend Requests{" "}
            <span id="requestsTotal">{pendingRequests.length}</span>
          </button>
          <ChatSelector
            currentUser={user}
            handleSelectChat={handleSelectChat}
            toggleSecret={toggleSecret}
          />
        </>
      );
    }
  }
  if (isLoaded(pendingRequests)) {
    return (
      <>
        <Header
          toggleRequests={toggleRequests}
          pendingRequestsCount={pendingRequests.length}
          resetPage={resetPage}
        />
        {currentState}
      </>
    );
  }
};

export default MessagesControl;
