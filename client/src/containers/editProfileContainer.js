import { connect } from 'react-redux';
import { fetchProfile, closeModal, fetchProfileAddress, updateProfileDetails } from '../actions/editProfileAction';
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
      dispatch(fetchProfile(userId));
    },
    fetchProfileAddress: (userId) => {
      dispatch(fetchProfileAddress(userId));
    },
    updateProfileDetails: (profile) => {
      dispatch(updateProfileDetails(profile));
    }
  };
};

const editProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfile);

export default editProfileContainer;