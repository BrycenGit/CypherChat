import { useFirestore } from "react-redux-firebase";
import React, { useState } from "react";
import styled from "styled-components";
function NewMessageForm(props) {
  const firestore = useFirestore();
  const { currentUser, recipientEmail, messageSent } = props;
  const emailArray = [currentUser.email, recipientEmail];
  const sortedEmails = emailArray.sort((a, b) => a.localeCompare(b));
  const collectionName = sortedEmails.join("-");
  const chatRef = firestore.collection(collectionName);
  const [formValue, setFormValue] = useState("");

  async function addMessageToFirestore(e) {
    e.preventDefault();
    await chatRef.add({
      body: e.target.body.value,
      sender: currentUser.email,
      recipient: recipientEmail,
      timeOpen: firestore.FieldValue.serverTimestamp(),
    });
    setFormValue("");
    messageSent();
  }

  return (
    <>
      <MessageForm onSubmit={addMessageToFirestore}>
        <div className="flex-form">
          <input
            name="body"
            value={formValue}
            onChange={(e1) => {
              setFormValue(e1.target.value);
            }}
          />
          <button type="submit">Submit</button>
        </div>
      </MessageForm>
    </>
  );
}

export default NewMessageForm;

const MessageForm = styled.form`
  .flex-form {
    display: flex;
    width: 100%;
    background-color: purple;
  }

  .flex-form input {
    line-height: normal;
    width: 100%;
    font-size: 1.5rem;
    background: black;
    color: #f9e900;
    outline: none;
    border: none;
    padding: 0 10px;
    animation: text-flicker 3s linear infinite;
    /* flex: 2 0 400px; */
    /* border-top-left-radius: 5px;
    border-bottom-left-radius: 5px; */
  }

  .flex-form button {
    height: 40px;
    flex: 1 0 90px;
    background-color: #ff0000d5;
  }
`;
