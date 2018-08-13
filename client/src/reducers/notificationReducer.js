const NotificationReducer = (state = {hasNewNotifications: false}, action) => {
  switch (action.type) {
    case 'HAS_NEW_NOTIFICATIONS':
      let obj = Object.assign({}, state, {hasNewNotifications: action.hasNewNotifications});
      return obj;
    default:
      return state;
  }
};

export default NotificationReducer;
