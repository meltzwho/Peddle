import { connect } from 'react-redux';
import axios from 'axios';
import { fetchProfileDetailsStart, fetchProfileDetailsSuccess, fetchProfileDetailsFail, closeModal, fetchProfileAddressStart, fetchProfileAddressSuccess, fetchProfileAddressFail, profileUpdateStart, profileUpdateSuccess, profileUpdateFail } from '../actions/editProfileAction';
import EditProfile from '../components/editProfile';

const mapStateToProps = (state) => {
  return {
    profile: state.editProfile,
    currentUserId: state.user.userId,
    picUrls: state.imageData.imageUrls
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeFailModal: () => {
      dispatch(closeModal());
    },
    fetchProfileDetails: (userId) => {
      dispatch(fetchProfileDetailsStart());
      axios.get(`/profile/user`, {params: {userId: userId}})
        .then(response => {
          dispatch(fetchProfileDetailsSuccess(response.data)),
          error => {
            console.error('an error occured fetching the user data', error);
            dispatch(fetchProfileDetailsFail());
          };
        });
    },
    fetchProfileAddress: (userId) => {
      dispatch(fetchProfileAddressStart());
      axios.get('/profile/address', {params: {userId: userId}})
        .then(response => {
          dispatch(fetchProfileAddressSuccess(response.data)),
          error => {
            console.error('there was an error fetching the addresses associated with this profile', error);
            dispatch(fetchProfileAddressFail());
          };
        });
    },
    updateProfileDetails: (profile) => {
      //in this function well need to take into account data that goes to three tables
      // users, address, users_images
      let userChanges = false;
      let userFields = {
        bio: false,
        dob: false,
        email: false,
        first_name: false,
        last_name: false,
        phone_number: false,
        username: false
      };
      let addressChanges = false;
      let addressFields = {
        address: false,
        city: false,
        state: false,
        zip_code: false
      };
      let pictureChanges = false;
      let pictureFields = {picture: false};
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
          } else if (pictureFields[key] !== undefined) {
            pictureFields[key] = profile[key];
            pictureChanges = true;
          } else {
            console.log('there was a field submitted were not accounting for', key, profile[key])
          }
        }
      }

      console.log('picture changes', pictureChanges, pictureFields);
      console.log('address chages', addressChanges, addressFields);
      console.log('user changes', userChanges, userFields);
      
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
      //check if any changes were made to the profile picture then update profile images
      
      //addresses, will have ability to add another address 
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
          .then(response => {
            console.log('the response for address update', response),
            error => console.error('there was an error updating this field', error);
          });
      }
    }
  };
};

const editProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfile);

export default editProfileContainer;