export const requestCategories = () => {
  return {
    type: 'REQUEST_CATEGORIES'
  };
};

export const receiveCategories = (categories) => {
  return {
    type: 'RECEIVE_CATEGORIES',
    categories: categories.map((category) => category)
  };
};

export const postListing = () => {
  return {
    type: 'POST_LISTING'
  };
};

export const listingPostSuccessful = () => {
  return {
    type: 'LISTING_POST_SUCCESS'
  };
};

export const listingPostFailure = () => {
  return {
    type: 'LISTING_POST_FAILURE'
  };
};

export const newListing = () => {
  return {
    type: 'NEW_LISTING'
  };
};

export const closeModal = () => {
  return {
    type: 'CLOSE_MODAL'
  };
};
