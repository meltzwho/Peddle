export const fetchProfileDetailsStart = () => ({type: 'FETCH_PROFILE_DETAILS_START'});

export const fetchProfileDetailsSuccess = (profile) => ({
  type: 'FETCH_PROFILE_DETAILS_SUCCESS',
  payload: {
    profileDetails: profile
  }
});

export const fetchProfileDetailsFail = () => ({type: 'FETCH_PROFILE_DETAILS_FAIL'});

export const closeModal = () => ({type: 'CLOSE_MODAL'});

export const fetchProfileAddressStart = () => ({type: 'FETCH_PROFILE_ADDRESS_START'});

export const fetchProfileAddressSuccess = () => ({
  type: 'FETCH_PROFILE_ADDRESS_SUCCESS',
  payload: {
    addressDetails: []
  }
});

export const fetchProfileAddressFail = () => ({type: 'FETCH_PROFILE_ADDRESS_FAIL'});
