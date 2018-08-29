import axios from "axios";

export const getListing = (listing) => ({
  type: 'GET_LISTING',
  payload: {
    listing: listing
  }
});

export const getSeller = (seller) => ({
  type: 'GET_SELLER',
  payload: {
    seller: seller,
  }
});

export const getRatingById = (rating) => ({
  type: 'GET_RATING',
  payload: {
    rating: rating
  }
});

export const getFeedbackBySellerId = (feedback) => ({
  type: 'GET_FEEDBACK',
  payload: {
    feedback: feedback
  }
});

export const getImagesByListingId = (images) => ({
  type: 'GET_IMAGES',
  payload: {
    images: images
  }
});

export const fetchCart = (userId) => {
  return (dispatch) => {
    return axios.get('/cart/lookup', {params: {ID: userId}})
      .then(response => dispatch(userCart(response.data)));
  }
}

export const userCart = (cart) => ({
  type: 'USER_CART',
  payload: {
    cart: cart
  }
});