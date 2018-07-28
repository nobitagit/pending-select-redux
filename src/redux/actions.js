import _ from 'lodash/fp';
import { TYPES, store } from '.';

const data = _.times(n => ({
  name: `name-${n}`,
  id: `unique-id-${n}`,
  age: n + 10,
}), 50);

function receiveNames(name) {
  return {
    type: TYPES.NAMES.SUCCESS,
    payload: name,
  };
}

export function fireRequest(len) {
  store.dispatch({ type: TYPES.NAMES.REQUEST });
  return dispatch => {
    setTimeout(() => {
      const ret = _.nth(len, data);
      console.log(ret);
      dispatch(receiveNames(ret));
    }, _.random(3000, 4000));
  }
}
