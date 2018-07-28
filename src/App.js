import React from 'react';
import logo from './logo.svg';
import _ from 'lodash/fp';
import './App.css';
import { fireRequest } from './redux/actions';
import { connect } from 'react-redux';
import { getAdults, getOver30, getEvens } from './redux/selectors';
import { isPending } from './redux/pendingReducer';
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
          <p>adults:</p>
          <ul>
            {_.map(o => <li key={o.id}>{o.name}, {o.age}</li>, adults)}
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

const toProps = (state, op) => {
  console.log(op);
  return {
    names: state.names.items,
    adults: getAdults(state),
    oldest: _.noop,
    over30: getOver30(state),
    even: getEvens(state),
    isLoading: isPending([TYPES.NAMES.REQUEST])(state),
  };
};

const toDispatch = dispatch => ({
  onRequestNames: () => {
    dispatch(fireRequest(1));
    dispatch(fireRequest(2));
    dispatch(fireRequest(3));
  }
})

export default connect(toProps, toDispatch)(App);
