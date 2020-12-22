import { useFirestore, isLoaded } from "react-redux-firebase";
import Message from "./Message";
import { useCollectionData } from "react-firebase-hooks/firestore";
import NewMessageForm from "./NewMessageForm";
import { useRef } from "react";
import styled from "styled-components";

function MessagesList(props) {
  const firestore = useFirestore();
  const { user, recipientEmail } = props;
  const emailArray = [user.email, recipientEmail];
  const sortedEmails = emailArray.sort((a, b) => a.localeCompare(b));
  const collectionName = sortedEmails.join("-");
  const messagesRef = firestore.collection(collectionName).orderBy("timeOpen");
  const [messagesList] = useCollectionData(messagesRef, { idField: "id" });
  const dummy = useRef();

  const messageSent = () => {
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  if (isLoaded(messagesList)) {
    return (
      <>
        <MessageBox>
          {messagesList &&
            messagesList.map((msg) => {
              return (
                <Message
                  key={msg.id}
                  user={user}
                  sender={msg.sender}
                  recipient={msg.recipient}
                  title={msg.title}
                  body={msg.body}
                  id={msg.id}
                />
              );
            })}
          <div ref={dummy}></div>
        </MessageBox>
        <NewMessageForm
          recipientEmail={recipientEmail}
          currentUser={user}
          messageSent={messageSent}
        />
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

const MessageBox = styled.div`
  width: 800px;
  /* background-color: ##343a40; */
  padding: 15px;
  height: 50vh;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 0.25rem;
  }
  ::-webkit-scrollbar-track {
    background: #1e1e24;
  }
  ::-webkit-scrollbar-thumb {
    background: #6649b8;
  }
`;
