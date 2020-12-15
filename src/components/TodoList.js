
import Todo from './Todo'
import { useSelector } from 'react-redux'
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase'

function TodoList() {

  useFirestoreConnect([ 'todos' ])

  const todosList = useSelector(state => state.firestore.ordered.todos);

  
  if (isLoaded(todosList)) {
    return (
      <>
        <h1>Todo List</h1>
        {todosList.map((todo) => {
          return <Todo name={todo.name} task={todo.task} id={todo.id} key={todo.id} />
        })}
      </>
    )
  } else {
    return (
      <>
        <p>Loading...</p>
      </>
   ) 
  }  
}

export default TodoList;