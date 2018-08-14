let defaultState = {
  productName: '',
  productDescription: '',
  productPrice: 0,
  productCondition: null,
  productQuantity: 1,
  allowPickup: false,
  allowShipping: false,
  categories: [],
  selectedCategory: 'category',
  selectedCategoryId: null,
  categoriesFetching: false,
  listingProcessing: false,
  listingSuccessful: null
};

let SellEntryReducer = (state = defaultState, action) => {
  switch (action.type) {
  case 'EDIT_EXISTING_LISTING':
    return Object.assign({}, state, action.editExistingListing);
  case 'REQUEST_CATEGORIES':
    return Object.assign({}, state, {categoriesFetching: true})
  case 'RECEIVE_CATEGORIES':
    return Object.assign({}, state, {
      categoriesFetching: false,
      categories: action.categories
    })
  case 'POST_LISTING': 
    return Object.assign({}, state, {listingProcessing: true})
  case 'LISTING_POST_SUCCESS':
    return Object.assign({}, state, {listingSuccessful: true})
  case 'LISTING_POST_FAILURE':
    return Object.assign({}, state, {listingSuccessful: false})
  case 'NEW_LISTING': 
    return Object.assign({}, state, defaultState)
  default:
    return state;
  }
};

export default SellEntryReducer;