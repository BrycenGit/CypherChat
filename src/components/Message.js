function Message(props) {
  const { title, body, sender, recipient, user } = props;
  const messageClass =
    user.email === sender
      ? "sent"
      : user.email === recipient
      ? "received"
      : "neither";

  return (
    <div className={`message ${messageClass}`}>
      {/* <p>title: {title}</p> */}
      <p>{body}</p>
    </div>
  );
}

export default Message;
