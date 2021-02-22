import React, { useEffect } from 'react';
import TodoListItem from './TodoListItem';
import './TodoList.css';
import NewTodoForm from './NewTodoForm';
import { connect } from 'react-redux';
import { loadTodos, removeTodoRequest, markAsCompletedRequest } from './thunks';
import { getCompletedTodos, getIncompletedTodos, getTodosLoading } from './selectors';

const TodoList = ({ completeTodos, incompletedTodos, isLoading, onRemovePressed, onCompletePressed, startLoadingTodos }) => {
  useEffect(() => {
    startLoadingTodos();
  }, []);

  const loadingMessage = (<div>Loading todos...</div>);
  const content = (
    <div className="todo-list-container">
      <NewTodoForm/>
      <h3>Incomplete:</h3>
      { incompletedTodos.map((todo) => { 
        return <TodoListItem todo={todo} key={todo.id} 
          onRemovePressed={onRemovePressed} 
          onCompletePressed={onCompletePressed}/> 
        }) 
      }
      <h3>Complete:</h3>
      { completeTodos.map((todo) => { 
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
  isLoading: getTodosLoading(state),
  completeTodos: getCompletedTodos(state),
  incompletedTodos: getIncompletedTodos(state)
});

const mapDispatchToProps = dispatch => ({
  onRemovePressed: (id) => dispatch(removeTodoRequest(id)),
  onCompletePressed: (id) => dispatch(markAsCompletedRequest(id)),
  startLoadingTodos: () => dispatch(loadTodos())
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);