import { useFirestore } from "react-redux-firebase";
import React, { useState } from "react";
import styled from "styled-components";

function NewMessageForm(props) {
  const decoder = process.env.REACT_APP_TOP_SECRET_ISH;
  console.log(decoder);
  const CryptoJS = require("crypto-js");

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
      body: CryptoJS.AES.encrypt(e.target.body.value, decoder).toString(),
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
            autoComplete="off"
            placeHolder={`Message ${recipientEmail}`}
            required
          />
          <button type="submit">Send</button>
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
    /* background-color: purple; */
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  .flex-form input {
    line-height: normal;
    width: 100%;
    font-size: 1.5rem;
    background: black;
    color: #ffe74c;
    outline: none;
    border: none;
    padding: 0 10px;
    /* animation: text-flicker 3s linear infinite; */

    /* flex: 2 0 400px; */
    /* border-top-left-radius: 4px;  */
    border-bottom-left-radius: 4px;
  }

  .flex-form button {
    height: 40px;
    flex: 1 0 90px;
    background-color: #ff1654;
    border: none;

    border-bottom-right-radius: 4px;
  }
`;
