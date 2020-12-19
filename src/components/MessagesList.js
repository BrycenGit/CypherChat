import { useFirestore, isLoaded } from "react-redux-firebase";
import Message from "./Message";
import { useCollectionData } from "react-firebase-hooks/firestore";
import NewMessageForm from "./NewMessageForm";
import { useRef } from "react";
function MessagesList(props) {
  const firestore = useFirestore();
  const { user, recipientEmail } = props;
  const emailArray = [user.email, recipientEmail];
  const sortedEmails = emailArray.sort((a, b) => a.localeCompare(b));
  const collectionName = sortedEmails.join("-");
  const messagesRef = firestore.collection(collectionName).orderBy("timeOpen");

  // .where("chat", "array-contains",  sortedEmails.join('-') )
  const [messagesList] = useCollectionData(messagesRef, { idField: "id" });
  const dummy = useRef();

  const messageSent = () => {
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  if (isLoaded(messagesList)) {
    return (
      <>
        <NewMessageForm
          recipientEmail={recipientEmail}
          currentUser={user}
          messageSent={messageSent}
        />
        <h1>message List</h1>
        <div className="message-box">
          {messagesList &&
            messagesList.map((msg) => {
              return (
                <div key={msg.id}>
                  <Message
                    user={user}
                    sender={msg.sender}
                    recipient={msg.recipient}
                    title={msg.title}
                    body={msg.body}
                    id={msg.id}
                    key={msg.id}
                  />
                </div>
              );
            })}
          <div ref={dummy}></div>
        </div>
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

export default MessagesList;
