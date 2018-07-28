import _ from 'lodash/fp';

export const getNames = () => {

}

export const getEvens = obj => {
  return _.filter(o => o.age % 2 === 0, obj);
}

export const getAdults = obj => {
  return _.filter(o => o.age > 18, obj);
}

export const getOver30 = obj => {
  return _.filter(o => o.age > 30, obj);
}
