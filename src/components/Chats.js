import { useFirestore, isLoaded } from "react-redux-firebase";
import React, { useState } from "react";
import Message from "./Message";
import { useCollectionData } from "react-firebase-hooks/firestore";

function Chats(props) {
  const firestore = useFirestore();
  const { handleSelectChat, currentUser } = props;

  const usersRef = firestore
    .collection("users")
    .where("email", "!=", currentUser.email);
  const [usersList] = useCollectionData(usersRef, { idField: "id" });

  const doSomething = (e) => {
    e.preventDefault();
    handleSelectChat(e.target.recipient.value);
  };

  if (isLoaded(usersList)) {
    // const filteredUsers = usersList.filter(
    //   (user) => user.email !== currentUser.email
    // );
    return (
      <>
        <h1>Chats</h1>
        <form onSubmit={(e) => doSomething(e)}>
          {usersList.map((user) => {
            return (
              <div key={user.id}>
                <label htmlFor={user.email}>{user.email}</label>
                <input name="recipient" type="radio" value={user.email} />
                <br />
              </div>
            );
          })}
          <button type="submit">Submit</button>
        </form>
      </>
    );
  } else {
    return (
      <>
        <p>Loading...</p>
      </>
    );
  }
}

export default Chats;
