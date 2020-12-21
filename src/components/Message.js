import styled from "styled-components";

function Message(props) {
  const { body, sender, recipient, user } = props;
  const messageClass =
    user.email === sender
      ? "sent"
      : user.email === recipient
      ? "received"
      : "neither";

  return (
    <ChatMessage>
      <div className={`message ${messageClass}`}>
        <p>{body}</p>
      </div>
    </ChatMessage>
  );
}

export default Message;

const ChatMessage = styled.div`
  .message {
    display: flex;
  }
  .sent {
    flex-direction: row-reverse;
  }
  .sent p {
    border-radius: 5px;
    color: white;
    background-color: #ff00e6;
    padding: 5px 10px;
  }
  .received p {
    border-radius: 5px;
    color: white;
    background-color: #1086e8;
    padding: 5px 10px;
  }
`;
