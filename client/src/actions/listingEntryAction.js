export const getListing = (listing) => {
  return {
    type: 'GET_LISTING',
    payload: {
      listing: listing
    }
  }
};

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