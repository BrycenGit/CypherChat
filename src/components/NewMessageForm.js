import {
  useFirestore,
  useFirestoreConnect,
  isLoaded,
} from "react-redux-firebase";
import { useSelector } from "react-redux";
import React, { useState } from "react";

function NewMessageForm(props) {
  const firestore = useFirestore();

  const { currentUser, recipientEmail } = props;

  useFirestoreConnect([
    {
      collection: "users",
    },
  ]);

  const emailArray = [currentUser.email, recipientEmail];
  const sortedEmails = emailArray.sort((a, b) => a.localeCompare(b));
  const collectionName = sortedEmails.join("-");

  const chatRef = firestore.collection(collectionName);

  const [formValue, setFormValue] = useState("");

  async function addMessageToFirestore(e) {
    e.preventDefault();

    await chatRef.add({
      // title: e.target.title.value,
      body: e.target.body.value,
      // chat: [sortedEmails.join('-')],
      sender: currentUser.email,
      recipient: recipientEmail,
      timeOpen: firestore.FieldValue.serverTimestamp(),
    });
    setFormValue("");
  }

  return (
    <>
      <h1>New Message Form</h1>
      <form onSubmit={addMessageToFirestore}>
        {/* <label htmlFor="title">Title</label>
        <input name="title" type="text" />
        <br /> */}
        {/* <label htmlFor="body">Body</label> */}
        <div class="flex-form">
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
