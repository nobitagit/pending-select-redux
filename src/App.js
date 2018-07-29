import React from 'react';
import logo from './logo.svg';
import _ from 'lodash/fp';
import './App.css';
import { fireRequest } from './redux/actions';
import { connect } from 'react-redux';
import { getAdults, getOver30, getEvens } from './redux/selectors';
import { awaitKey, isPending, isKeyDone } from './redux/pendingReducer';
import { TYPES } from './redux';

const App = ({
  names, onRequestNames, adults, over30, even, isLoading,
}) => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Welcome to React</h1>
    </header>
    <p className="App-intro">
      Request is {isLoading ? 'loading' : 'loaded'}
    </p>
    <div>
      <button onClick={() => onRequestNames(3)}>
        get names
      </button>
      <main className="App__main">
        <div>
        <p>Fetched:</p>
          <ul>
          {_.map(
            o => <li key={o.id}>{o.name}, {o.age}</li>,
            names
          )}
          </ul>
        </div>
        <div>
          <p>adults: status => {adults.done ? 'done' : 'not done'}</p>
          <ul>
            {_.map(o => <li key={o.id}>{o.name}, {o.age}</li>, adults.result)}
          </ul>
        </div>
        <div>
          <p>over 30:</p>
          <ul>
            {_.map(o => <li key={o.id}>{o.name}, {o.age}</li>, over30)}
          </ul>
        </div>
        <div>
          <p>evens:</p>
          <ul>
            {_.map(o => <li key={o.id}>{o.name}, {o.age}</li>, even)}
          </ul>
        </div>
      </main>
    </div>
  </div>
);

const reqKeys = {
  adults: Symbol('adults'),
};

const toProps = (state, op) => {
//  console.log(op);
console.log(state);
  return {
    names: state.names.items,
    adults: {
      result: getAdults(state),
      done: isKeyDone(reqKeys.adults)(state),
    },
    oldest: _.noop,
    over30: getOver30(state),
    even: getEvens(state),
    isLoading: isPending([TYPES.NAMES.REQUEST])(state),
  };
};

const toDispatch = dispatch => ({
  onRequestNames: () => {
    const reqs = [
      [reqKeys.adults, dispatch(fireRequest(20))],
    ];

    _.map(r => awaitKey(...r), reqs);

    dispatch(fireRequest(2));
    dispatch(fireRequest(3));


  }
})

const mergeProps = (fromState, fromDispatch) => {
  //console.log(fromDispatch.onRequestNames());
  return {
    ...fromState,
    ...fromDispatch,
    onRequestNames: () => {},
  };
}

export default connect(toProps, toDispatch, mergeProps)(App);
