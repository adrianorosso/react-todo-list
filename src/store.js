import { applyMiddleware, combineReducers, createStore } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { todos } from './todos/reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const reducers = {
  todos,
}

const rootReducers = combineReducers(reducers);

const persistConfig = {
  key: 'root',
  storage,
}

export const persistedReducer = persistReducer(persistConfig, rootReducers);

export const configureStore = () => createStore(
  persistedReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);
