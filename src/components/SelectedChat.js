import MessagesList from "./MessagesList";

const SelectedChat = (props) => {
  const { handleUnselectChat, user, recipientEmail } = props;
  console.log(recipientEmail);
  return (
    <div>
      <MessagesList user={user} recipientEmail={recipientEmail} />
    </div>
  );
};

export default SelectedChat;
