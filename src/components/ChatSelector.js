import { useFirestore, isLoaded } from "react-redux-firebase";
import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import NewFriendForm from "./NewFriendForm";
import NewMessageForm from "./NewMessageForm";

function Chats(props) {
  const firestore = useFirestore();
  const { handleSelectChat, currentUser, toggleSecret } = props;

  const usersRef = firestore
    .collection("users")
    .doc(currentUser.uid)
    .collection("friends");
  // .where("email", "!=", currentUser.email);
  const [usersList] = useCollectionData(usersRef, { idField: "id" });

  if (isLoaded(usersList)) {
    return (
      <>
        <NewFriendForm usersList={usersList} currentUser={currentUser} />
        <h1>Chats</h1>
        <p onClick={toggleSecret}>🐱‍👤</p>
        <div className="dropdown">
          <button className="dropbtn">Users</button>
          <div className="dropdown-content">
            {usersList.map((user) => {
              return (
                <p key={user.id} onClick={() => handleSelectChat(user.email)}>
                  {user.email}
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
