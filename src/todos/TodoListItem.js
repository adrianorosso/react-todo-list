import React from 'react';
import styled from 'styled-components';

const TodoItemContainer = styled.div`
  background:#fff;
  border-radius: 8px;
  margin-top: 8px;
  padding: 16px;
  position: relative;
  box-shadow: 0 4px 8px grey;
`

/**
 * Good example of how to extend a styled component
 */
const TodoItemContainerWithWarning = styled(TodoItemContainer)`
  border-bottom: ${props => (new Date(props.createdAt) > new Date(Date.now() - 86400000 * 5) 
    ? 'none' : '3px solid red')};
`

const ButtonsContainer = styled.div`
  position: absolute;
  right: 12px;
  bottom: 12px;
`

const RemoveButton = styled.button`
  font-size; 16px;
  padding: 8px;
  border: none;
  border-radius: 8px;
  outline: none;
  cursor: pointer;
  display: inline-block;
  background-color: #ee2222;
  margin-left: 8px;
`

const CompletedButton = styled.button`
  font-size; 16px;
  padding: 8px;
  border: none;
  border-radius: 8px;
  outline: none;
  cursor: pointer;
  display: inline-block;
  background-color: #22ee22;
  margin-left: 8px;
`

const TodoListItem = ({ todo, onRemovePressed, onCompletePressed }) => {
  // We want the red border only in the incomplete cards
  const Container = todo.isCompleted ? TodoItemContainer : TodoItemContainerWithWarning;

  return (
    <Container createdAt={todo.createdAt}>
      <h4>{todo.text}</h4>
      <p><u>Created At:</u> &nbsp;
        {new Date(todo.createdAt).toLocaleDateString()}
      </p>
      <ButtonsContainer>
        <RemoveButton
          onClick={() => onRemovePressed(todo.id)}
        >
          Remove
        </RemoveButton>
        { todo.isCompleted ? null : 
          <CompletedButton
            onClick={() => onCompletePressed(todo.id)}
          >
            Mark as completed
          </CompletedButton>
        }
      </ButtonsContainer>
    </Container>
  );
}

export default TodoListItem;