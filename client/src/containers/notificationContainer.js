import { connect } from 'react-redux';
import Axios from 'axios';
import notification from '../actions/notificationAction';
import Notification from '../components/Notifications';

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications.notifications,
    id_user: 1
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    checkNotification: (id_user) => {
      Axios.get('/notifs', {params:{id_user}})
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
