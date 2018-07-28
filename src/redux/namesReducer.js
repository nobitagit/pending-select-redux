import _ from 'lodash/fp';
import { TYPES } from '.';

const initialState = {
  items: [],
  ids: {},
};


export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TYPES.NAMES.SUCCESS:
      return {
        ...state,
        items: _.uniqBy(o => o.id, _.concat(state.items, action.payload)),
        ids: {
          ...state.ids,
          ...{ [action.payload.id]: action.payload },
        },
      };
    default:
      return state;
  }
}
