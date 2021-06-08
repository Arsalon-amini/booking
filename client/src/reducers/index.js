import {combineReducers } from 'redux';
import { authReducer } from '../reducers/auth';

  //combine multiple reducers
  const rootReducer = combineReducers({
    user: authReducer
  });

  export default rootReducer; 