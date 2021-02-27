import React, { useEffect } from 'react';
import TodoListItem from './TodoListItem';
import styled from 'styled-components';
import NewTodoForm from './NewTodoForm';
import { connect } from 'react-redux';
import { loadTodos, removeTodoRequest, markAsCompletedRequest } from './thunks';
import { getCompletedTodos, getIncompletedTodos, getTodosLoading } from './selectors';

const ListWrapper = styled.div`
  max-width: 700px;
  margin: auto;
`

const TodoList = ({ completeTodos, incompletedTodos, isLoading, onRemovePressed, onCompletePressed, startLoadingTodos }) => {
  useEffect(() => {
    startLoadingTodos();
  }, []);

  const loadingMessage = (<div>Loading todos...</div>);
  const content = (
    <ListWrapper>
      <NewTodoForm/>
      <h2>Incomplete:</h2>
      { incompletedTodos.map((todo) => { 
        return <TodoListItem todo={todo} key={todo.id} 
          onRemovePressed={onRemovePressed} 
          onCompletePressed={onCompletePressed}/> 
        }) 
      }
      <h2>Complete:</h2>
      { completeTodos.map((todo) => { 
        return <TodoListItem todo={todo} key={todo.id} 
          onRemovePressed={onRemovePressed} 
          onCompletePressed={onCompletePressed}/> 
        }) 
      }
    </ListWrapper>
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