import _ from 'lodash/fp';
import { store, TYPES } from '.';

export default function pendingReducer(state = {}, action) {
  const { type } = action;

  //const matches = _.some(t => _.includes(t, type), ['REQUEST', 'SUCCESS']);
  const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(type);
//console.log(matches);

  if (!matches) {
    return state;
  }

  const [, prefix, status] = matches;

  return {
    ...state,
    [`${prefix}_REQUEST`]: status,
  };
}

export const isPending = actions => state => _.flow(
  _.concat([]),
  _.some(action  => {
    //console.log(_.get(['pending', action], state) === 'REQUEST');
    return _.get(['pending', action], state) === 'REQUEST';
  }),
)(actions);

export function pendingKeysReducer(state = [], action) {
  switch (action.type) {
    case TYPES.PENDING_KEYS.ADD: {
      console.log('add', action, [action.payload], state);
      return [action.payload];
    }
    case TYPES.PENDING_KEYS.REMOVE:
      return _.flow(
        _.findIndex(o => o === action.payload),
        _.pullAt(_, state),
      )(state);
    default:
      return state;
  }
}

export const isKeyDone = key => state => {
  return _.every(k => k !== key, state.pendingKeys);
}

export const awaitKey = async (key, fn) => {
  store.dispatch({ type: TYPES.PENDING_KEYS.ADD, payload: key })
  try {
    await fn;
  } catch (e) {

  } finally {
    return store.dispatch({ type: TYPES.PENDING_KEYS.REMOVE, payload: key });
  }
}