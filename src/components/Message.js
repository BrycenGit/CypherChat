function Message(props) {
  const { title, body, sender, recipient, user } = props;
  const messageClass = user.email === sender ? 'sent' : 'received';
  return (
    <div class={messageClass}>
      <p>title: {title}</p>
      <p>body: {body}</p>
      <hr />
    </div>
  )
}

export default Message;