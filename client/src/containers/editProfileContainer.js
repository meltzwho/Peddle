import { connect } from 'react-redux';
import axios from 'axios';
import { fetchProfileDetailsStart, fetchProfileDetailsSuccess, fetchProfileDetailsFail, closeModal, fetchProfileAddressStart, fetchProfileAddressSuccess, fetchProfileAddressFail } from '../actions/editProfileAction';
import EditProfile from '../components/editProfile';

const mapStateToProps = (state) => {
  return {
    currentUserDetails: state.editProfile,
    currentUserId: state.user.userId
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
          console.log('the response in the client for address', response.data),
          dispatch(fetchProfileAddressSuccess(response.data)),
          error => {
            console.error('there was an error fetching the addresses associated with this profile', error);
            dipatch(fetchProfileAddressFail())
          }
        })
    }
  };
};

const editProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfile);

export default editProfileContainer;