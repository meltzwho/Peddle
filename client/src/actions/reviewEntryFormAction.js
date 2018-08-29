import axios from 'axios';

export const getListing = (listingId) => {
  return dispatch => {
    dispatch(getListingStart());
    return axios.get(`/l/lid/${listingId}`)
      .then(res => {
        dispatch(getSeller(res.data[0].id_seller));
        dispatch(getRatings(res.data[0].id_seller));
        dispatch(getListingSuccess(res.data[0]));
      })
      .catch(() => dispatch(getListingFail()));
  };
};

export const getListingStart = () => ({type: 'GET_LISTING_START'});

export const getListingSuccess = (listing) => ({
  type: 'GET_LISTING_SUCCESS',
  payload: {
    listing: listing
  }
});

export const getListingFail = () => ({type: 'GET_LISTING_FAIL'});

export const getSeller = (sellerId) => {
  return dispatch => {
    return axios.get(`/users/userId/${sellerId}`)
      .then(res => dispatch(getSellerSuccess(res.data[0])),
        () => dispatch(getSellerFail()));
  };
};

export const getSellerStart = () => ({type: 'GET_SELLER_START'});

export const getSellerSuccess = (seller) => ({
  type: 'GET_SELLER_SUCCESS',
  payload: {
    seller: seller
  }
});

export const getSellerFail = () => ({type: 'GET_SELLER_FAIL'});

export const getBuyer = (buyerId) => {
  return dispatch => {
    return axios.get(`/users/userId/${buyerId}`)
      .then(res => dispatch(getBuyerSuccess(res.data[0])),
        () => dispatch(getSellerFail()));
  };
};

export const getBuyerStart = () => ({type: 'GET_BUYER_START'});

export const getBuyerSuccess = (buyer) => ({
  type: 'GET_BUYER_SUCCESS',
  payload: {
    buyer: buyer
  }
});

export const getBuyerFail = () => ({type: 'GET_BUYER_FAIL'});


export const getRatings = (sellerId) => {
  return dispatch => {
    return axios.get(`/ratings/feedback/${sellerId}`)
      .then(res => dispatch(getRatingsSuccess(res.data)),
        () => dispatch(getRatingsFail()));
  };
};

export const getRatingsStart = () => ({type: 'GET_RATINGS_START'});

export const getRatingsSuccess = (ratings) => ({
  type: 'GET_RATINGS_SUCCESS',
  payload: {
    ratings: ratings
  }
});

export const getRatingsFail = () => ({type: 'GET_RATINGS_FAIL'});