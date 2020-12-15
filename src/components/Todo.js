

function Todo(props) {
  const { name, task } = props;
  
  return (
    <>
      <p>Name: {name}</p>
      <p>Task: {task}</p>
      <hr />
    </>
  )
}

export default Todo;