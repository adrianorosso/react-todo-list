import { 
  loadTodosInProgres,
  loadTodosFailure,
  loadTodosSuccess,
  createTodo,
  removeTodo,
  completeTodo 
} from './actions';

export const loadTodos = () => async (dispatch) => {
  try {
    dispatch(loadTodosInProgres());
    const response = await fetch('http://localhost:8080/todos-delay');
    const todos = await response.json();
    dispatch(loadTodosSuccess(todos));
  } catch(e) {
    dispatch(loadTodosFailure());
    dispatch(displayAlert(e))
  }
}

export const addTodoRequest = (text) => async (dispatch) => {
  try {
    const body = JSON.stringify({ text });
    const response = await fetch('http://localhost:8080/todos', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: body
    });
    const todo = await response.json();
    dispatch(createTodo(todo))
  } catch (e) {
    dispatch(displayAlert(e));
  }
}

export const removeTodoRequest = (id) => async (dispatch) => {
  console.log(`http://localhost:8080/${id}`);
  const response = await fetch(`http://localhost:8080/todos/${id}`, { method: 'delete'});
  const removedTodo = await response.json();

  dispatch(removeTodo(removedTodo.id));
}

export const markAsCompletedRequest = (id) => async (dispatch) => {
  // /todos/:id/completed
  const body = JSON.stringify({ id });
  const response = await fetch(`http://localhost:8080/todos/${id}/completed`, {
    method: 'post',
    headers: {'Content-type': 'application/json'},
    body: body
  });

  const updatedTodo = await response.json();

  dispatch(completeTodo(updatedTodo.id));
}
  
export const displayAlert = text => () => {
  alert(text);
}