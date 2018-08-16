import { combineReducers } from 'redux';
import notificationReducer from './notificationReducer';
import searchReducer from './searchReducer';
import sellEntryReducer from './sellEntryReducer';
import imageUploadReducer from './imageUploadReducer';

const rootReducer = combineReducers({
  notifications: notificationReducer,
  sellEntryForm: sellEntryReducer,
  search: searchReducer,
  imageData: imageUploadReducer
});

export default rootReducer;
