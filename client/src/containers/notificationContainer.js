import { connect } from 'react-redux';
import Axios from 'axios';
import notification from '../actions/notificationAction';
import Notification from '../components/Notifications.jsx';

const mapStateToProps = (state) => {
  return {
    notifications: state.notificationReducer.notifications,
    id_user: 1
  };
};
//fix endpoint to accept id_user
const mapDispatchToProps = (dispatch) => {
  return {
    checkNotification: (id_user) => {
      Axios.get('/notifs')
        .then(results => 
          dispatch(notification(results.data)));
    }
  };
};

const NotificationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification);

export default NotificationContainer;
