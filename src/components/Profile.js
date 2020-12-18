import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded } from "react-redux-firebase";

function Profile() {
  const currentUserEmail = "brycenbartolome@gmail.com";

  useFirestoreConnect(["messages"]);

  const messagesList = useSelector((state) => state.firestore.ordered.messages);

  if (isLoaded(messagesList)) {
    // const sentMessages = messagesList.filter(message => message.sender === currentUserEmail)
    const receivedMessages = messagesList.filter(
      (message) => message.recipient === currentUserEmail
    );
    console.log(receivedMessages);
    return <></>;
  } else {
    return (
      <>
        <p>Loading...</p>
      </>
    );
  }
}

export default Profile;
