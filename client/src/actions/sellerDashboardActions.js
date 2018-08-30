import axios from 'axios';

export const fetchListingsStart = () => ({type: 'FETCH_LISTINGS_START'});

export const fetchListingsFail = () => ({type: 'FETCH_LISTINGS_FAIL'});

export const closeModal = () => ({type: 'CLOSE_MODAL'});

export const addTrackingData = (details) => {
  return (dispatch) => {
    return axios.post('/sellerDashboard/tracking', details)
      .then(response => {dispatch(fetchSoldListings(details.userId))},
        error => console.log('error posting tracking data', error));
  }
}

//SOLD LISTINGS ACTIONS//
export const fetchSoldListings = (userId) => {
  return (dispatch) => {
    dispatch(fetchListingsStart());
    return axios.get('/sellerDashboard/soldListings', {params: {userId: userId}})
      .then(response => dispatch(fetchSoldListingsComplete(response.data)),
        error => dispatch(fetchListingsFail()));
  };
};

export const fetchSoldListingsComplete = (listings) => {
  return ({
    type: 'FETCH_SOLD_COMPLETE',
    payload: {
      sold: listings
    }
  });
};

//ACTIVE LISTINGS ACTIONS//
export const fetchActiveListings = (userId) => {
  return (dispatch) => {
    dispatch(fetchListingsStart());
    return axios.get('/sellerDashboard/activeListings', {params: {userId: userId}})
      .then(response => dispatch(fetchActiveListingsComplete(response.data)),
        error => dispatch(fetchListingsFail()));
  };
};

export const fetchActiveListingsComplete = (listings) => {
  return ({
    type: 'FETCH_ACTIVE_COMPLETE',
    payload: {
      active: listings
    }
  });
};


export const fetchInactiveListings = (userId) => {
  return (dispatch) => {
    dispatch(fetchListingsStart());
    return axios.get('/sellerDashboard/inactiveListings', {params: {userId: userId}})
      .then(response => dispatch(fetchInactiveListingsComplete(response.data)),
        error => dispatch(fetchListingsFail()));
  };
};

export const fetchInactiveListingsComplete = (listings) => {
  return ({
    type: 'FETCH_INACTIVE_COMPLETE',
    payload: {
      inactive: listings
    }
  });
};


