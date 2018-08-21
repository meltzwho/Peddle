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
  selectedCategory: 'Please select',
  selectedCategoryId: null,
  categoriesFetching: false,
  listingProcessing: false,
  listingSuccessful: null,
  listingEdit: false,
  listingId: null
};


const SellEntryReducer = (state = newForm, action) => {
  switch (action.type) {
    case 'EDIT_EXISTING_LISTING':
      return Object.assign({}, state, {
        productName: action.payload.listing.title,
        productDescription: action.payload.listing.description,
        productPrice: action.payload.listing.price,
        productCondition: action.payload.listing.condition,
        productQuantity: 1,
        allowPickup: action.payload.listing.is_local > 0 ? true : false,
        streetAddress: action.payload.listing.address ? action.payload.listing.address : '',
        cityAddress: action.payload.listing.city ? action.payload.listing.city : '',
        stateAddress: action.payload.listing.state ? action.payload.listing.state : '',
        zipCodeAddress: action.payload.listing.zip_code ? action.payload.listing.zip_code : '',
        allowShipping: action.payload.listing.is_shipping > 0 ? true : false,
        selectedCategoryId: action.payload.listing.id_category,
        selectedCategory: action.payload.listing.category,
        listingEdit: true,
        listingId: action.payload.listing.id_listing
      });
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