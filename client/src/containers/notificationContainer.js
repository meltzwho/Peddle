import { connect } from 'react-redux';
import notification from '../actions/notificationAction.js';
import Notification from '../components/Notifications.jsx';

const mapStateToProps = (state) => {
  return {
    hasNewNotifications: state.notificationReducer.hasNewNotifications
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    newNotification: (hasNewNotifications) => { dispatch(notification(hasNewNotifications)); }
  };
};

var NotificationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification);

export default NotificationContainer;
