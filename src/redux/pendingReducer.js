import _ from 'lodash/fp';

export default function pendingReducer(state = {}, action) {
  const { type } = action;

  const matches = _.some(t => _.includes(t, type), ['REQUEST', 'SUCCESS']);

  if (!matches) {
    return state;
  }

  return state;
}