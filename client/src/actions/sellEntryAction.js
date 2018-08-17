export const requestCategories = () => {
  return {
    type: 'REQUEST_CATEGORIES'
  };
};

export const receiveCategories = (categories) => ({
  type: 'RECEIVE_CATEGORIES',
  payload: {
    categories: categories.map((category) => category)
  }
});

export const postListing = () => ({type: 'POST_LISTING'});

export const listingPostSuccessful = () => ({type: 'LISTING_POST_SUCCESS'});

export const listingPostFailure = () => ({type: 'LISTING_POST_FAILURE'});

export const newListing = () => ({type: 'NEW_LISTING'});

export const closeModal = () => ({type: 'CLOSE_MODAL'});

export const editExistingListing = (listing) => ({
  type: 'EDIT_EXISTING_LISTING',
  payload: {
    listing: listing
  }
});
