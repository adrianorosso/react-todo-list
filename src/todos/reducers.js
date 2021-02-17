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
      return state.concat(payload);
    case REMOVE_TODO:
      return state.filter(todo => todo.id !== payload)
    case MARK_AS_COMPLETED:
      return state.map(todo => { 
        if (todo.id === payload) {
          return {...todo, isCompleted: true}
        }
        return todo;
      });
      case LOAD_TODOS_SUCCESS:
        const todos = payload
        return todos;
      case LOAD_TODOS_IN_PROGRESS:
      case LOAD_TODOS_FAILURE:
    default:
      return state;
  }
}