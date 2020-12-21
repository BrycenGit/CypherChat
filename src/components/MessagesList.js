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
        <Container>
          <MessageBox>
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
          </MessageBox>
          <NewMessageForm
            recipientEmail={recipientEmail}
            currentUser={user}
            messageSent={messageSent}
          />
        </Container>
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

const Container = styled.div`
  background-color: blue;
`;

const MessageBox = styled.div`
  background-color: green;
`;
