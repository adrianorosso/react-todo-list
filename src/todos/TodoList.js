import React, { useEffect } from 'react';
import TodoListItem from './TodoListItem';
import './TodoList.css';
import NewTodoForm from './NewTodoForm';
import { connect } from 'react-redux';
import { loadTodos, removeTodoRequest, markAsCompletedRequest } from './thunks';

const TodoList = ({ todos = [], onRemovePressed, onCompletePressed, isLoading, startLoadingTodos }) => {
  useEffect(() => {
    startLoadingTodos();
  }, []);

  const loadingMessage = (<div>Loading todos...</div>);
  const content = (
    <div className="todo-list-container">
      <NewTodoForm/>
      { todos.map((todo) => { 
        return <TodoListItem todo={todo} key={todo.id} 
          onRemovePressed={onRemovePressed} 
          onCompletePressed={onCompletePressed}/> 
        }) 
      }
    </div>
  );

  return isLoading ? loadingMessage : content;
}

const mapStateToProps = state => ({
  isLoading: state.isLoading,
  todos: state.todos
});

const mapDispatchToProps = dispatch => ({
  onRemovePressed: (id) => dispatch(removeTodoRequest(id)),
  onCompletePressed: (id) => dispatch(markAsCompletedRequest(id)),
  startLoadingTodos: () => dispatch(loadTodos())
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);