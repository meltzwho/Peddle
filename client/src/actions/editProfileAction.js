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


//POST or PUT edits to the profile

export const updateProfileDetails = (profile) => {
  return (dispatch) => {
    //in this function well need to take into account data that goes to two tables
    // users, address
    let userChanges = false;
    let userFields = {
      bio: false,
      dob: false,
      email: false,
      first_name: false,
      last_name: false,
      phone_number: false,
      username: false,
      profile_image_url: false
    };
    let addressChanges = false;
    let addressFields = {
      address: false,
      city: false,
      state: false,
      zip_code: false,
      title: false
    };
    //loop through the profile object and if any fields have length greater than 0
    for (let key in profile) {
      if (profile[key].length > 0) {
        //flip appropriate flag and add to approrpriate obj
        if (userFields[key] !== undefined) {
          userFields[key] = profile[key];
          userChanges = true;
        } else if (addressFields[key] !== undefined) {
          addressFields[key] = profile[key];
          addressChanges = true;
        } else {
          console.log('there was a field submitted were not accounting for', key, profile[key])
        }
      }
    }
    
    //check in profile if any changes to any user data have occured then update user table
    if (userChanges) {
      let params = {};
      //loop through the user fields upbject
      for (let key in userFields) {
        //if field is not false, add to params object
        if (userFields[key]) {
          params[key] = userFields[key];
        }
      }
      params.userId = profile.userId;
      axios.put('/profile/updateUser', params)
        .then(response => {
          dispatch(fetchProfileDetailsSuccess(response.data)),
          error => console.error('there was an error updating this field', error);
        });
    }     
    //check if any changes were made to the address and if so insert into addresses
    if (addressChanges) {
      let params = {};
      //loop through the user fields upbject
      for (let key in addressFields) {
        //if field is not false, add to params object
        if (addressFields[key]) {
          params[key] = addressFields[key];
        }
      }
      params.userId = profile.userId;
      params.addressId = profile.addressId;
      axios.put('/profile/updateAddress', params)
        .then(response => dispatch(fetchProfileAddressSuccess(response.data)),
          error => console.error('there was an error updating this field', error));
    }
  };
};