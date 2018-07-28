import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import _ from 'lodash/fp';

export const TYPES = {
  NAMES: {
    REQUEST: 'REQUEST_NAMES',
    SUCCESS: 'REQUEST_SUCCESS_NAMES',
  },
};

const initialState = {
  names: [],
  ids: {},
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case TYPES.NAMES.SUCCESS:
      return {
        ...state,
        names: _.uniqBy(o => o.id, _.concat(state.names, action.payload)),
        ids: {
          ...state.ids,
          ...{ [action.payload.id]: action.payload },
        },
      };
    default:
      return state;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//const store = createStore(reducer, /* preloadedState, */ composeEnhancers(
export const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(thunk)
  ),
  //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);