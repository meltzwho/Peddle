

const SellEntryReducer = (state = {
  productName: '',
  productDescription: '',
  productPrice: 0,
  allowPickup: false,
  allowShipping: false,
  categories: [],
  selectedCategory: 'category',
  selectedCategoryId: null,
  categoriesFetching: false
}, action) => {
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
    default:
      return state;
  }
};

export default SellEntryReducer;