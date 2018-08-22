const defaultState = {
  listingFetch: false,
  listing: {
    id_listing: '',
    id_category: '',
    title: '',
    conditon: '',
    price: '',
    id_seller: '',
    id_address: '',
    is_active: '',
    quantity_sold: '',
    quantity: '',
    date_posted: '',
    last_price: '',
    description: '',
    is_shipping: '',
    is_local: '',
  },
  seller: {
    id_user: '',
    first_name: '',
    last_name: '',
    username: '',
    dob: '',
    is_seller: '',
    email: '',
    phone_number: '',
    bio: '',
    member_since: '',
    google_id: '',
    facebook_id: '',
    profile_image_url: ''
  },
  rating: {
    id_rating: '',
    id_user: '',
    rating: '',
    count: '',
  },
  feedback: [{
    id_feedback: '',
    id_seller: '',
    id_buyer: '',
    rating: '',
    feedback: '',
    id_listing: '',
    timestamp: '',
    title: '',
  }]
};

const listingEntryReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'GET_LISTING':
      return Object.assign({}, state, {listing: action.payload.listing, listingFetch: true});
    case 'GET_SELLER':
      return Object.assign({}, state, {seller: action.payload.seller});
    case 'GET_RATING':
      return Object.assign({}, state, {rating: action.payload.rating});
    case 'GET_FEEDBACK':
      return Object.assign({}, state, {feedback: action.payload.feedback});
    case 'GET_IMAGES':
      return Object.assign({}, state, {images: action.payload.images});
    default:
      return state;
  }
};

export default listingEntryReducer;