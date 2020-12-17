function Message(props) {
  const { title, body } = props;
  
  return (
    <>
      <p>title: {title}</p>
      <p>body: {body}</p>
      <hr />
    </>
  )
}

export default Message;