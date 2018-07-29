import _ from 'lodash/fp';
import { TYPES, store } from '.';

const data = _.times(n => ({
  name: `name-${n}`,
  id: `unique-id-${n}`,
  age: n + 10,
}), 50);

function receiveNames(name, key) {
  return {
    type: TYPES.NAMES.SUCCESS,
    payload: name,
    key,
  };
}

export function fireRequest(len, key) {
  store.dispatch({ type: TYPES.NAMES.REQUEST });
  return dispatch => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        const ret = _.nth(len, data);
        console.log(ret);
        dispatch(receiveNames(ret, key));
        res();
      }, _.random(3000, 4000));
    });
  }
}
