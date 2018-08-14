import { combineReducers } from 'redux';
import notificationReducer from './notificationReducer.js';
import searchReducer from './searchReducer.js';
import sellEntryReducer from './sellEntryReducer.js';
import imageUploadReducer from './imageUploadReducer.js';

const rootReducer = combineReducers({
  notificationReducer,
  sellEntryReducer,
  searchReducer,
  imageUploadReducer
});

export default rootReducer;
