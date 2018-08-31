import axios from 'axios';

//FETCH SELLER LISTING FOR THIS PROFILE//
export const fetchProfileListings = (userId) => {
  return dispatch => {
    dispatch(fetchProfileListingsStart());
    return axios.get('/sellerDashboard/activeListings', {params: {userId: userId}})
      .then(response => dispatch(fetchProfileListingsSuccess(response.data)),
        error => dispatch(fetchProfileListingsFail()));
  };
};

export const fetchProfileListingsStart = () => ({type: 'FETCH_PROFILE_LISTINGS_START'});

export const fetchProfileListingsSuccess = (listings) => ({
  type: 'FETCH_PROFILE_LISTINGS_SUCCESS',
  payload: {
    listings: listings
  }
});

export const fetchProfileListingsFail = () => ({type: 'FETCH_PROFILE_LSITINGS_FAIL'});


//FETCH USER PROFILE DETAILS//
export const fetchUserDetails = (userId) => {
  return dispatch => {
    dispatch(fetchUserDetailsStart());
    return axios.get(`/profile/user`, {params: {userId: userId}})
      .then(response => dispatch(fetchUserDetailsSuccess(response.data)),
        error => dispatch(fetchUserDetailsFail()));
  };
};

export const fetchUserDetailsStart = () => ({type: 'FETCH_USER_DETAILS_START'});

export const fetchUserDetailsSuccess = (user) => ({
  type: 'FETCH_USER_DETAILS_SUCCESS',
  payload: {
    userDetails: user
  }
});

export const fetchUserDetailsFail = () => ({type: 'FETCH_USER_DETAILS_FAIL'});

//failure to fetch user details modal
export const closeModal = () => ({type: 'CLOSE_MODAL'});


//FETCH USER RATINGS//
export const fetchProfileRating = (userId) => {
  return dispatch => {
    return axios.get('/profile/rating', {params: {userId: userId}})
      .then(response => dispatch(fetchUserRatingSuccess(response.data)),
        error => dispatch(fetchUserRatingFail()));
  };
};

export const fetchUserRatingStart = () => ({type: 'FETCH_USER_RATINGS_START'});

export const fetchUserRatingSuccess = (userRating) => ({
  type: 'FETCH_USER_RATINGS_SUCCESS',
  payload: {
    userRating: userRating
  } 
});

export const fetchUserRatingFail = () => ({type: 'FETCH_USER_RATINGS_FAIL'});

export const fetchFeedback = (userId) => {
  return dispatch => {
    return axios.get(`/ratings/feedback/${userId}`)
      .then(res => dispatch(fetchFeedbackSuccess(res.data)),
        () => dispatch(fetchFeedbackFail()));
  };
};

export const fetchFeedbackStart = () => ({type: 'FETCH_FEEDBACK_START'});

export const fetchFeedbackSuccess = (feedback) => ({
  type: 'FETCH_FEEDBACK_SUCCESS',
  payload: {
    feedback: feedback
  }
});

export const fetchFeedbackFail = () => ({type: 'FETCH_FEEDBACK_SUCCESS'});

export const wipeProfile = () => ({type: 'WIPE_PROFILE'});
