import { useFirestore } from 'react-redux-firebase'


function NewTodoForm(props) {
  console.log(props)

  const firestore = useFirestore();
  const todosRef = firestore.collection('todos')

  function addTodoToFirestore(e) {
    e.preventDefault();

    return todosRef.add(
      {
        name: e.target.name.value,
        task: e.target.task.value,
        timeOpen: firestore.FieldValue.serverTimestamp()
        
      }
    )
  }

  return (
    <>
    <h1>New Todo Form</h1>
    <form onSubmit={addTodoToFirestore}>
      <label htmlFor="name">Name</label>
      <input name="name" type="text" />
      <br />
      <label htmlFor="task">Task</label>
      <input name="task" type="text" />
      <br />
      <button type="submit">Submit</button>
    </form>
    </>
  )
}



export default NewTodoForm

