const defaultState = {
  fetchingListings: false,
  active: [],
  sold: [],
  inactive: [],
  listingFetchSuccess: null
};

const SellerDashboardReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCH_LISTINGS_START':
      return Object.assign({}, state, {fetchingListings: true});
    case 'FETCH_LISTINGS_FAIL': 
      return Object.assign({}, state, {fetchingListings: false, listingFetchSuccess: false});
    case 'CLOSE_MODAL':
      return Object.assign({}, state, {listingFetchSuccess: null});
    case 'FETCH_SOLD_COMPLETE':
      return Object.assign({}, state, {sold: action.payload.sold, listingFetchSuccess: true, fetchingListings: false});
    case 'FETCH_ACTIVE_COMPLETE':
      return Object.assign({}, state, {active: action.payload.active, listingFetchSuccess: true, fetchingListings: false});
    case 'FETCH_INACTIVE_COMPLETE': 
      return Object.assign({}, state, {inactive: action.payload.inactive, listingFetchSuccess: true, fetchingListings: false});
    default: 
      return state;
  }
};

export default SellerDashboardReducer;