import React from 'react';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';
import NewTodoForm from './NewTodoForm';
import TodoList from './TodoList';

// const enhance = connect(
//   ({ firebase: { auth, profile } }) => ({
//     auth,
//     profile
//   })
// )


class TodosControl extends React.Component {
  render(){
    console.log(this.props)
    return (
      <>
        <h1>Hello World</h1>
        <NewTodoForm />
        <TodoList />
      </>
    )
  }  
}


TodosControl = connect()(TodosControl)


export default withFirestore(TodosControl);