import { combineReducers } from 'redux';
import notificationReducer from './notificationReducer.js';
import searchReducer from './searchReducer.js';
import sellEntryReducer from './sellEntryReducer.js';

const rootReducer = combineReducers({
  notificationReducer,
  sellEntryReducer,
  searchReducer
});

export default rootReducer;
