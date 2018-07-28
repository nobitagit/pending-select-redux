import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import names from './namesReducer';
import pending from './pendingReducer';

export const TYPES = {
  NAMES: {
    REQUEST: 'REQUEST_NAMES',
    SUCCESS: 'REQUEST_SUCCESS_NAMES',
  },
};

const reducer = combineReducers({
  names,
  pending,
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