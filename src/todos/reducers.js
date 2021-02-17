import { CREATE_TODO, MARK_AS_COMPLETED, REMOVE_TODO,
 LOAD_TODOS_IN_PROGRESS, LOAD_TODOS_SUCCESS, LOAD_TODOS_FAILURE } from './actions';

 export const isLoading = (state = false, action) => {
   const { type } = action;

   switch(type) {
      case LOAD_TODOS_IN_PROGRESS:
       return true;
      case LOAD_TODOS_SUCCESS:
      case LOAD_TODOS_FAILURE:
        return false;
      default:
        return state
   }
 }

export const todos = (state = [], action) => {
  const { type, payload } = action;

  switch(type) {
    case CREATE_TODO:
      const newTodo = {
        text: payload,
        isCompleted: false
      };
      return state.concat(newTodo);
    case REMOVE_TODO:
      return state.filter(todo => todo.text !== payload)
    case MARK_AS_COMPLETED:
      state.forEach(todo => { 
        if (todo.text === payload) {
          todo.isCompleted = true;
        }
      });
      return state;
      case LOAD_TODOS_SUCCESS:
        const todos = payload
        return todos;
      case LOAD_TODOS_IN_PROGRESS:
      case LOAD_TODOS_FAILURE:
    default:
      return state;
  }
}