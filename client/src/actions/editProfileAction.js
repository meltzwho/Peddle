import axios from 'axios';



//FETCH PROFILE USER ACTIONS//
export const fetchProfile = (userId) => {
  return dispatch => {
    dispatch(fetchProfileDetailsStart());
    return axios.get(`/profile/user`, {params: {userId: userId}})
      .then(response => dispatch(fetchProfileDetailsSuccess(response.data)),
        error => dispatch(fetchProfileDetailsFail()));
  }
}

export const fetchProfileDetailsStart = () => ({type: 'FETCH_PROFILE_DETAILS_START'});

export const fetchProfileDetailsSuccess = (profile) => ({
  type: 'FETCH_PROFILE_DETAILS_SUCCESS',
  payload: {
    profileDetails: profile
  }
});

export const fetchProfileDetailsFail = () => ({type: 'FETCH_PROFILE_DETAILS_FAIL'});


//No functionality hooked up for this modal yet, we could display a modal if our profile details call fails
export const closeModal = () => ({type: 'CLOSE_MODAL'});


//FETCH PROFILE ADDRESS DETAILS ACTIONS//
export const fetchProfileAddress = (userId) => {
  return dispatch => {
    dispatch(fetchProfileAddressStart());
    return axios.get('/profile/address', {params: {userId: userId}})
      .then(response => dispatch(fetchProfileAddressSuccess(response.data)),
        error => dispatch(fetchProfileAddressFail()));
  };
};

export const fetchProfileAddressStart = () => ({type: 'FETCH_PROFILE_ADDRESS_START'});

export const fetchProfileAddressSuccess = (addresses) => ({
  type: 'FETCH_PROFILE_ADDRESS_SUCCESS',
  payload: {
    addressDetails: addresses
  }
});


export const fetchProfileAddressFail = () => ({type: 'FETCH_PROFILE_ADDRESS_FAIL'});

export const wipeEdit = () => ({type: 'WIPE_EDIT'});
