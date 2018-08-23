const defaultState = {
  fetchingProfileListings: false,
  listings: [],
  fetchProfileListingsSuccess: null,
  modalOpen: false,
  fetchingUserDetails: false,
  userDetails: {},
  fetchUserDetailsSuccess: null,
  fetchingUserRating: false,
  fetchUserRatingSuccess: null,
  userRating: {}
};

const profileReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCH_PROFILE_LISTING_START':
      return Object.assign({}, state, {fetchingProfileListings: true});
    case 'FETCH_PROFILE_LISTINGS_SUCCESS':
      return Object.assign({}, state, {listings: action.payload.listings, fetchingProfileListings: false, fetchProfileListingsSuccess: true});
    case 'FETCH_PROFILE_LISTINGS_FAILURE':
      return Object.assign({}, state, {fetchingProfileListings: false, fetchProfileListingsSuccess: false});
    case 'FETCH_USER_DETAILS_START':
      return Object.assign({}, state, {fetchingUserDetails: true});
    case 'FETCH_USER_DETAILS_SUCCESS':
      return Object.assign({}, state, {userDetails: action.payload.userDetails, fetchingUserDetails: false, fetchUserDetailsSuccess: true});
    case 'FETCH_USER_DETAILS_FAIL':
      return Object.assign({}, state, {fetchingUserDetails: false, fetchUserDetailsSuccess: false});
    case 'CLOSE_MODAL':
      return Object.assign({}, state, {fetchUserDetailsSuccess: null});
    case 'FETCH_USER_RATINGS_START':
      return Object.assign({}, state, {fetchingUserRating: true});
    case 'FETCH_USER_RATINGS_SUCCESS':
      return Object.assign({}, state, {userRating: action.payload.userRating, fetchingUserRatings: false, fetchUserRatingSuccess: true});
    case 'FETCH_USER_RATINGS_FAIL':
      return Object.assign({}, state, {fetchingUserRating: false, fetchUserRatingSuccess: false});
    default:
      return state;

  }
};

export default profileReducer;
