import styled from "styled-components";

function Message(props) {
  const CryptoJS = require("crypto-js");
  const decoder = process.env.REACT_APP_TOP_SECRET_ISH;
  const { body, sender, recipient, user } = props;
  const bytes = CryptoJS.AES.decrypt(body, decoder);
  const message = bytes.toString(CryptoJS.enc.Utf8);
  const messageClass =
    user.email === sender
      ? "sent"
      : user.email === recipient
      ? "received"
      : "neither";

  return (
    <ChatMessage>
      <div className={`message ${messageClass}`}>
        <p>{message}</p>
      </div>
    </ChatMessage>
  );
}

export default Message;

const ChatMessage = styled.div`
  .message {
    display: flex;
    font-size: 1.2rem;
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
