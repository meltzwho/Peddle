import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addUser, removeUser } from '../actions/appAction';
import { wipeProfile } from '../actions/profileAction';
import { wipeEdit } from '../actions/editProfileAction';
import { clearUrls } from '../actions/imageUploadActions';
import { newListing } from '../actions/sellEntryAction';
import { wipeNotifications } from '../actions/notificationAction';
import { wipeOrders } from '../actions/ordersAction';
import App from '../components/App';

const mapStateToProps = (state) => {
  return {
    currentUserId: state.user.userId,
    currentuser: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addUserToStore: (user) => {
      dispatch(addUser(user));
    },
    removeUserFromStore: () => {
      dispatch(removeUser());
      dispatch(wipeProfile());
      dispatch(wipeEdit());
      dispatch(clearUrls());
      dispatch(newListing());
      dispatch(wipeNotifications());
      dispatch(wipeOrders());
    }
  }
};

const appContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default withRouter(appContainer);