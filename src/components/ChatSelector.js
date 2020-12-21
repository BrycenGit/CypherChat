import { useFirestore, isLoaded } from "react-redux-firebase";
import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";

function ChatSelector(props) {
  const firestore = useFirestore();
  const { handleSelectChat, currentUser } = props;

  const usersRef = firestore
    .collection("users")
    .doc(currentUser.uid)
    .collection("friends");
  // .where("email", "!=", currentUser.email);
  const [usersList] = useCollectionData(usersRef, { idField: "id" });

  if (isLoaded(usersList)) {
    return (
      <>
        {/* <div className="dropdown">
          <button className="dropbtn">Friends</button>
          <div className="dropdown-content">
            {usersList.map((user) => {
              return (
                <button
                  key={user.id}
                  onClick={() => handleSelectChat(user.email)}
                >
                  {user.email}
                </button>
              );
            })}
          </div>
        </div> */}
        <div className="dropdown">
          <Nav.Link className="dropbtn">Friends</Nav.Link>
          <div className="dropdown-content">
            {usersList.map((user) => {
              return (
                <button
                  key={user.id}
                  onClick={() => handleSelectChat(user.email)}
                >
                  {user.email}
                </button>
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

export default ChatSelector;
