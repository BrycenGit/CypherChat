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

  if (isLoaded(usersList)) {
    return (
      <>
        <h1>Chats</h1>
        <div class="dropdown">
          <button class="dropbtn">Users</button>
          <div class="dropdown-content">
            {usersList.map((user) => {
              return (
                <p onClick={() => handleSelectChat(user.email)}>
                  {user.username}
                </p>
              );
            })}
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <img src="https://bit.ly/2LPpEt0" alt="loading" />
      </>
    );
  }
}

export default Chats;
