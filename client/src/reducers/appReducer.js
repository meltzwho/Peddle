const appReducer = (state = {
  cookieValid: null,
  currentUser: {
    bio: null,
    dob: null,
    email: '',
    facebook_id: null,
    first_name: null,
    google_id: null,
    id_user: null,
    is_seller: null,
    last_name: '',
    phone_number: null,
    profile_image: '',
    profile_image_url: null,
    token: '',
    token_timestamp: null,
    username: null,
  }
}, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      return Object.assign({}, state, {imageUploadProcessing: true});
    case 'SIGNUP_USER':
      return Object.assign({}, state, {imageUploadProcess: false, imageUrls: [...state.imageUrls, action.payload.url]});
    case 'LOGOUT_USER':
      return state;
    default:
      return state;
  }
};

export default appReducer;