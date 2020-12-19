import MessagesList from "./MessagesList";

const SelectedChat = (props) => {
  const { handleUnselectChat, user, recipientEmail } = props;
  console.log(recipientEmail);
  return (
    <div>
      <h1>chat page</h1>
      <button onClick={handleUnselectChat}>home</button>
      <MessagesList user={user} recipientEmail={recipientEmail} />
    </div>
  );
};

export default SelectedChat;
