export const fetchProfileListingsStart = () => ({type: 'FETCH_PROFILE_LISTINGS_START'});

export const fetchProfileListingsSuccess = (listings) => ({
  type: 'FETCH_PROFILE_LISTINGS_SUCCESS',
  payload: {
    listings: listings
  }
});

export const fetchProfileListingsFail = () => ({type: 'FETCH_PROFILE_LSITINGS_FAIL'});

export const closeModal = () => ({type: 'CLOSE_MODAL'});

export const fetchUserDetailsStart = () => ({type: 'FETCH_USER_DETAILS_START'});

export const fetchUserDetailsSuccess = (user) => ({
  type: 'FETCH_USER_DETAILS_SUCCESS',
  payload: {
    userDetails: user
  }
});

export const fetchUserDetailsFail = () => ({type: 'FETCH_USER_DETAILS_FAIL'});

export const fetchUserRatingStart = () => ({type: 'FETCH_USER_RATINGS_START'});

export const fetchUserRatingSuccess = (userRating) => ({
  type: 'FETCH_USER_RATINGS_SUCCESS',
  payload: {
    userRating: userRating
  } 
});

export const fetchUserRatingFail = () => ({type: 'FETCH_USER_RATINGS_FAIL'});

export const wipeProfile = () => ({type: 'WIPE_PROFILE'});
