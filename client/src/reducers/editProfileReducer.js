const defaultState = {
  fetchingProfileDetails: false,
  fetchProfileSuccess: null,
  profileDetails: {},
  fetchingAddressDetails: false,
  fetchAddressSuccess: null,
  addressDetails: []
};


const editProfileReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCH_PROFILE_DETAILS_START':
      return Object.assign({}, state, {fetchingProfileDetails: true});
    case 'FETCH_PROFILE_DETAILS_SUCCESS':
      return Object.assign({}, state, {fetchingProfileDetails: false, fetchProfileSuccess: true, profileDetails: action.payload.profileDetails});
    case 'FETCH_PROFILE_DETAILS_FAIL':
      return Object.assign({}, state, {fetchingProfileDetails: false, fetchProfileSuccess: false});
    case 'CLOSE_MODAL':
      return Object.assign({}, state, {fetchProfileSuccess: null});
    case 'FETCH_PROFILE_ADDRESS_START':
      return Object.assign({}, state, {fetchingAddressDetails: true});
    case 'FETCH_PROFILE_ADDRESS_SUCCESS':
      return Object.assign({}, state, {addressDetails: action.payload.addressDetails, fetchingAddressDetails: false, fetchAddressSuccess: true});
    case 'FETCH_PROFILE_ADDRESS_FAIL':
      return Object.assign({}, state, {fetchAddressSuccess: false, fetchingAddressDetails: false});
    default:
      return state;
  }
}

export default editProfileReducer;