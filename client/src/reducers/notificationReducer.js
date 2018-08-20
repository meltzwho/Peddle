const NotificationReducer = (state = {notifications: []}, action) => {
  switch (action.type) {
    case 'NEW_NOTIFICATIONS':
      let obj = Object.assign({}, state, {notifications: action.notifications});
      return obj;
    default:
      return state;
  }
};


export default NotificationReducer;
