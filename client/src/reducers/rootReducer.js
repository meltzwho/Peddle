import { combineReducers } from 'redux';
import notificationReducer from './notificationReducer';
import searchReducer from './searchReducer';
import sellEntryReducer from './sellEntryReducer';
import imageUploadReducer from './imageUploadReducer';
import sellerDashboardReducer from './sellerDashboardReducer';
import ordersReducer from './orderReducer';

const rootReducer = combineReducers({
  notifications: notificationReducer,
  sellEntryForm: sellEntryReducer,
  search: searchReducer,
  imageData: imageUploadReducer,
  sellerListings: sellerDashboardReducer,
  orders: ordersReducer
});

export default rootReducer;
