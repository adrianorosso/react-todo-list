import { createSelector } from 'reselect';
import { todos } from './reducers';

export const getTodos = (state) => { return state.todos.data; }
export const getTodosLoading = (state) => { return state.todos.isLoading; }

export const getCompletedTodos = createSelector(
  getTodos,
  (todos) => todos.filter(todo => todo.isCompleted)
);

export const getIncompletedTodos = createSelector(
  getTodos,
  (todos) => todos.filter(todo => !todo.isCompleted)
);