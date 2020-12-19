import React, { useReducer, useState } from "react";
import "firebase/auth";
import MessagesList from "./MessagesList";
import ChatSelector from "./ChatSelector";
import { blankPageReducer } from "../reducers/blank-page-reducer";
import { chatSelectionReducer } from "../reducers/chat-selection-reducer";
import SecretPage from "./SecretPage";
import SelectedChat from "./SelectedChat";

const MessagesControl = (props) => {
  const { user } = props;
  const [selectedChat, dispatch2] = useReducer(chatSelectionReducer);
  const [recipient, setRecipient] = useState(null);
  const [secretPage, setSecretPage] = useState(false);
  let currentState = null;

  const handleSelectChat = (recipientEmail) => {
    setRecipient(recipientEmail);
    dispatch2({ type: "SELECT_CHAT", recipient: recipientEmail });
  };

  const toggleSecret = () => {
    setSecretPage(!secretPage);
  };

  const handleUnselectChat = () => {
    setRecipient(null);
    dispatch2({ type: "UNSELECT_CHAT" });
  };

  if (selectedChat != null) {
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
      <ChatSelector
        currentUser={user}
        handleSelectChat={handleSelectChat}
        toggleSecret={toggleSecret}
      />
    );
  }

  return <>{currentState}</>;
};

export default MessagesControl;
