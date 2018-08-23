import { combineReducers } from 'redux';
import appReducer from './appReducer';
import notificationReducer from './notificationReducer';
import searchReducer from './searchReducer';
import sellEntryReducer from './sellEntryReducer';
import imageUploadReducer from './imageUploadReducer';
import sellerDashboardReducer from './sellerDashboardReducer';
import ordersReducer from './orderReducer';
import ShoppingCartReducer from './shoppingCartReducer';
import profileReducer from './profileReducer';
import listingEntryReducer from './listingEntryReducer';
import editProfileReducer from './editProfileReducer';

const rootReducer = combineReducers({
  app: appReducer,
  notifications: notificationReducer,
  sellEntryForm: sellEntryReducer,
  search: searchReducer,
  imageData: imageUploadReducer,
  sellerListings: sellerDashboardReducer,
  orders: ordersReducer,
  cart: ShoppingCartReducer,
  user: appReducer,
  profile: profileReducer,
  listingEntry: listingEntryReducer,
  editProfile: editProfileReducer
});

export default rootReducer;
