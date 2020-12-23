import { useFirestore, isLoaded } from "react-redux-firebase";
import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { NavDropdown } from "react-bootstrap";

function ChatSelector(props) {
  const firestore = useFirestore();
  const { handleSelectChat, currentUser, setExpandFalse } = props;

  const usersRef = firestore
    .collection("users")
    .doc(currentUser.uid)
    .collection("friends");
  const [usersList] = useCollectionData(usersRef, { idField: "id" });

  if (isLoaded(usersList)) {
    return (
      <>
        <NavDropdown title="Friends" id="collasible-nav-dropdown">
          {usersList.map((user) => {
            return (
              <NavDropdown.Item
                key={user.id}
                onClick={() => {
                  handleSelectChat(user.email);
                  setExpandFalse();
                }}
              >
                {user.email}
              </NavDropdown.Item>
            );
          })}
        </NavDropdown>
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
