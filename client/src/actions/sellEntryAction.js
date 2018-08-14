export const requestCategories = () => {
  return {
    type: 'REQUEST_CATEGORIES'
  }
}

export const receiveCategories = (categories) => {
  return {
    type: 'RECEIVE_CATEGORIES',
    categories: categories.map((category) => category)
  }
}

export const postListing = (listing) => {
  return {
    type: 'POST_LISTING'
  }
}

export const listingPostSuccessful = () => {
  return {
    type: 'LISTING_POST_SUCCESS'
  }
}

export const listingPostFailure = () => {
  return {
    type: 'LISTING_POST_FAILURE'
  }
}

export const newListing = () => {
  console.log('in the action new listing')
  return {
    type: 'NEW_LISTING'
  }
}
