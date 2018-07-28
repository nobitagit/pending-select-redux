import _ from 'lodash/fp';

export default function pendingReducer(state = {}, action) {
  const { type } = action;

  //const matches = _.some(t => _.includes(t, type), ['REQUEST', 'SUCCESS']);
  const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(type);
console.log(matches);

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
    console.log(_.get(['pending', action], state) === 'REQUEST');
    return _.get(['pending', action], state) === 'REQUEST';
  }),
)(actions);