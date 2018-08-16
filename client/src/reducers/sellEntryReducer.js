let newForm = {
  productName: '',
  productDescription: '',
  productPrice: 0,
  productCondition: null,
  productQuantity: 1,
  allowPickup: false,
  streetAddress: '',
  cityAddress: '',
  stateAddress: '',
  zipCodeAddress: '',
  defaultAddress: true,
  allowShipping: false,
  categories: [],
  selectedCategory: 'category',
  selectedCategoryId: null,
  categoriesFetching: false,
  listingProcessing: false,
  listingSuccessful: null
};

const SellEntryReducer = (state = newForm, action) => {
  switch (action.type) {
    case 'EDIT_EXISTING_LISTING':
      return Object.assign({}, state, action.editExistingListing);
    case 'REQUEST_CATEGORIES':
      return Object.assign({}, state, {categoriesFetching: true});
    case 'RECEIVE_CATEGORIES':
      return Object.assign({}, state, {
        categoriesFetching: false,
        categories: action.payload.categories
      });
    case 'POST_LISTING': 
      return Object.assign({}, state, {listingProcessing: true});
    case 'LISTING_POST_SUCCESS':
      return Object.assign({}, state, {listingSuccessful: true});
    case 'LISTING_POST_FAILURE':
      return Object.assign({}, state, {listingSuccessful: false});
    case 'NEW_LISTING': 
      return Object.assign({}, state, newForm);
    case 'CLOSE_MODAL':
      return Object.assign({}, state, {listingSuccessful: null});
    default:
      return state;
  }
};

export default SellEntryReducer;