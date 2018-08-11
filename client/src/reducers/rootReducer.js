import { combineReducers } from 'redux';
import notificationReducer from './notificationReducer.js';
import searchReducer from './searchReducer.js';

const rootReducer = combineReducers({
  notificationReducer,
  searchReducer
});

export default rootReducer;
