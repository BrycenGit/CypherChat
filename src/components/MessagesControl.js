import React, { useReducer, useState } from "react";
import "firebase/auth";
import MessagesList from "./MessagesList";
import Chats from "./Chats";
import { blankPageReducer } from "../reducers/blank-page-reducer";
import { chatSelectionReducer } from "../reducers/chat-selection-reducer";

const MessagesControl = (props) => {
  const { user } = props;
  const [blankPage, dispatch1] = useReducer(blankPageReducer);
  const [selectedChat, dispatch2] = useReducer(chatSelectionReducer);
  const [recipient, setRecipient] = useState(null);
  const [secretPage, setSecretPage] = useState(false);
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

  const handleblankClick = () => {
    dispatch1({ type: "TOGGLE_BLANK" });
  };

  if (selectedChat != null) {
    return (
      <div>
        <h1>chat page</h1>
        <button onClick={handleUnselectChat}>home</button>
        <MessagesList user={user} recipientEmail={recipient} />
      </div>
    );
  } else if (secretPage) {
    return (
      <div>
        <h1>SECRET</h1>
        <button onClick={toggleSecret}>home</button>
      </div>
    );
  } else if (blankPage) {
    return (
      <div>
        <h1>BlankPage</h1>
        <button onClick={handleblankClick}>Not Blank</button>
      </div>
    );
  } else {
    return (
      <div>
        <h1>{user.email}</h1>
        <Chats
          handleblankClick={handleblankClick}
          currentUser={user}
          handleSelectChat={handleSelectChat}
          toggleSecret={toggleSecret}
        />
      </div>
    );
  }
};

export default MessagesControl;
