import React from 'react';
import './TodoListItem.css'

const TodoListItem = ({ todo, onRemovePressed, onCompletePressed }) => {
  return (
    <div className="todo-item">
      <p>{todo.text}</p>
      <button
        onClick={() => onRemovePressed(todo.text)}
        className="remove-button">
        Remove
      </button>
      { todo.isCompleted ? null : 
        <button 
          onClick={() => onCompletePressed(todo.text)}
          className="completed-button">
          Mark as completed
        </button>
      }
    </div>
  );
}

export default TodoListItem;