import React, { useState } from "react";
import "firebase/auth";
import ChatSelector from "./ChatSelector";
import SecretPage from "./SecretPage";
import SelectedChat from "./SelectedChat";

const MessagesControl = (props) => {
  const { user } = props;
  const [recipient, setRecipient] = useState(null);
  const [secretPage, setSecretPage] = useState(false);
  const [requestsPage, setRequestsPage] = useState(false);
  let currentState = null;
  const requestsTotal = "number";
  const toggleRequests = () => {
    setRecipient(!requestsPage);
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
  } else {
    currentState = (
      <>
        <button onClick={toggleRequests}>
          Friend Requests <span id="requestsTotal">{requestsTotal}</span>
        </button>
        <ChatSelector
          currentUser={user}
          handleSelectChat={handleSelectChat}
          toggleSecret={toggleSecret}
        />
      </>
    );
  }

  return <>{currentState}</>;
};

export default MessagesControl;
