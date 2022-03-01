import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';

import './index.css';
import App from './components/App';
import combineReducers from './components/reducers';

// currying concept used here
// function logger (obj,next,action) = logger (obj)(next)(action)
// const logger = function ({ dispatch, getState }) {
//   return function (next) {
//     return function (action) {
//       // middleware code
//       console.log("ACTION_TYPE", action.type);
//       next(action);
//     };
//   };
// };
  
// 2nd way of using currying 
const logger = ({ dispatch, getState }) => (next) => (action) => {
  // middleware code
  console.log('ACTION_TYPE', action.type);
  next(action);
};

const thunk = ({ dispatch }) => (next) => (action) => {
  // middleware code
  if (typeof action === 'function') {
    action(dispatch);
    return;
  }
  next(action);
};

const store = createStore(combineReducers, applyMiddleware(logger,thunk));
console.log("Store", store);
// console.log('Before State', store.getState());

// store.dispatch({
//   type: "ADD_MOVIES",
//   movies: [{name:"Superman"}]
// });

// console.log('After State', store.getState());

ReactDOM.render(
  <React.StrictMode>
    <App store={ store }/> 
  </React.StrictMode>,
  document.getElementById('root')
);