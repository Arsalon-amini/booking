import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//setup app for using redux
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension'; 

//create user reducer function
const authReducer = (state = {}, action ) => {
  switch(action.type){
    case "LOGGED_IN_USER":
      return {...state, ...action.payload}
    case 'LOGOUT':
      return action.payload;
    default:
      return state; 
  }
};

//combine multiple reducers
const rootReducer = combineReducers({
  user: authReducer
});

//create a reduce store
 const store = createStore(rootReducer, composeWithDevTools());

 //provide store to entire app using Provider

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
