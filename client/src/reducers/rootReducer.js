import { combineReducers } from 'redux';
import notificationReducer from './notificationReducer.js';
import sellEntryReducer from './sellEntryReducer.js';

const rootReducer = combineReducers({
  notificationReducer,
  sellEntryReducer
});
export default rootReducer;
