const defaultState = {
  fetchingListing: false,
  listing: {},
  fetchingListingSuccess: null,
  fetchingSeller: false,
  seller: {},
  fetchingSellerSuccess: null,
  fetchingBuyer: false,
  buyer: {},
  fetchingBuyerSuccess: null,
  fetchingRatings: false,
  ratings: {},
  fetchingRatingsSuccess: null,
  title: '',
  rating: 0,
  feedback: ''
};

const editProfileReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'GET_LISTING_START':
      return Object.assign({}, state, {fetchingListing: true});
    case 'GET_LISTING_SUCCESS':
      return Object.assign({}, state, {listing: action.payload.listing, fetchingListing: false, fetchingListingSuccess: true});
    case 'GET_LISTING_FAIL':
      return Object.assign({}, state, {fetchingListing: false, fetchingListingSuccess: false});
    case 'GET_SELLER_START':
      return Object.assign({}, state, {fetchingSeller: true});
    case 'GET_SELLER_SUCCESS':
      return Object.assign({}, state, {seller: action.payload.seller, fetchingSeller: false, fetchingSellerSuccess: true});
    case 'GET_SELLER_FAIL':
      return Object.assign({}, state, {fetchingSeller: false, fetchingSellerSuccess: false});
    case 'GET_BUYER_START':
      return Object.assign({}, state, {fetchingBuyer: true});
    case 'GET_BUYER_SUCCESS':
      return Object.assign({}, state, {buyer: action.payload.buyer, fetchingBuyer: false, fetchingBuyerSuccess: true});
    case 'GET_BUYER_FAIL':
      return Object.assign({}, state, {fetchingBuyer: false, fetchingBuyerSuccess: false});
    case 'GET_RATINGS_START':
      return Object.assign({}, state, {fetchingRatings: true});
    case 'GET_RATINGS_SUCCESS':
      return Object.assign({}, state, {ratings: action.payload.ratings, fetchingRatings: false, fetchingRatingsSuccess: true});
    case 'GET_RATINGS_FAIL':
      return Object.assign({}, state, {fetchingRatings: false, fetchingRatingsSuccess: false});
    case 'WIPE_REVIEW_ENTRY_FORM':
      return defaultState;
    default:
      return state;
  }
};

export default editProfileReducer;