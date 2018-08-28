import axios from 'axios';

export const fetchUserListings = (userId) => {
  return (dispatch) => {
    dispatch(fetchListingsStart());
    return axios.get('/sellerDashboard/listings', {params: {userId: userId}})
      .then(response => dispatch(fetchListingsSuccess(response.data)),
        error => dispatch(fetchListingsFail()));
  };
};

export const fetchListingsStart = () => ({type: 'FETCH_LISTINGS_START'});

export const fetchListingsSuccess = (listings) => {
  return ({
    type: 'FETCH_LISTINGS_SUCCESS',
    payload: {
      listings: listings
    }
  })
};


export const fetchListingsFail = () => ({type: 'FETCH_LISTINGS_FAIL'});

export const closeModal = () => ({type: 'CLOSE_MODAL'});

export const addTrackingData = (details) => {
  return (dispatch) => {
    return axios.post('/sellerDashboard/tracking', details)
      .then(response => console.log('response', response),
        error => console.log('error posting tracking data', error));
  }
}