import { useFirestore } from "react-redux-firebase";
import React, { useState } from "react";

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
      <h1>New Message Form</h1>
      <form onSubmit={addMessageToFirestore}>
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
      </form>
    </>
  );
}

export default NewMessageForm;
