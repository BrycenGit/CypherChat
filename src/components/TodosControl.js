import React from 'react';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';
import NewTodoForm from './NewTodoForm';
import TodoList from './TodoList';
import NewUserForm from './NewUserForm';
import NewMessageForm from './NewMessageForm';
import Profile from './Profile';

class TodosControl extends React.Component {
  render(){
    console.log(this.props)
    return (
      <>
        <h1>Hello World</h1>
        <Profile />
        <NewUserForm />
        <hr />
        <NewMessageForm />
        <hr />
        <NewTodoForm />
        <TodoList />
      </>
    )
  }  
}


TodosControl = connect()(TodosControl)


export default withFirestore(TodosControl);