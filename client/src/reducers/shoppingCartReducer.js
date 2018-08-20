const dummyData = require('../../src/components/Cart/dummydata');

const defaultState = {
  isDesktop: false,
  cartItems: dummyData,
  cartTotal: 0
};

// cartItem objects contents
// title: 'A Nice Item',
// price: 20.00,
// idListing: 10,
// quantity: 2
// username: 'Mack the Seller',
// description: 'This item is red/black and size large',
// img_url: longURL

const shoppingCartReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'TOGGLE_IS_DESKTOP':
      return Object.assign({}, state, {isDesktop: window.innerWidth > 2000});
      
    // case 'REMOVE_ITEM':
    //   return Object.assign({}, state, {listings: action.payload.listings, listingFetchSuccess: true, fetchingListings: false});

    // case 'CHECKOUT_YOUR_CART': 
    //   return Object.assign({}, state, {fetchingListings: false, listingFetchSuccess: false});

    // case 'CHANGE_QUANTITY':
    //   return Object.assign({}, state, {listingFetchSuccess: null});
    default: 
      return state;
  }
};

export default shoppingCartReducer;