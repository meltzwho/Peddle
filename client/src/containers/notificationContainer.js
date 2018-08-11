import { connect } from 'react-redux';
import notification from '../actions/notificationAction.js';
import Notification from '../components/Notifications.jsx';

const mapStateToProps = (state) => {
  return {
    hasNewNotifications: state.hasNewNotifications
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    newNotification: (hasNewNotifications) => { console.log('fired'); dispatch(notification(hasNewNotifications)) }
  };
};

var NotificationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification);

export default NotificationContainer;