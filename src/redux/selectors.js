import _ from 'lodash/fp';

export const getNames = () => {

}

export const getEvens = state => {
  return _.filter(o => o.age % 2 === 0, state.names.items);
}

export const getAdults = state => {
  return _.filter(o => o.age > 18, state.names.items);
}

export const getOver30 = state => {
  return _.filter(o => o.age > 30, state.names.items);
}
