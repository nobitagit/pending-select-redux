import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import names from './namesReducer';
import pending, { pendingKeysReducer as pendingKeys } from './pendingReducer';

export const TYPES = {
  NAMES: {
    REQUEST: 'NAMES_REQUEST',
    SUCCESS: 'NAMES_SUCCESS',
  },
  PENDING_KEYS: {
    ADD: 'PENDING_KEYS_ADD',
    REMOVE: 'PENDING_KEYS_REMOVE',
  },
};

const reducer = combineReducers({
  names,
  pending,
  pendingKeys,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//const store = createStore(reducer, /* preloadedState, */ composeEnhancers(
export const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(thunk)
  ),
  //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);