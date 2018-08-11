let NotificationReducer = (state = null, action) => {
  switch (action.type){
  case 'HAS_NEW_NOTIFICATIONS':
    console.log(action.hasNewNotifications);
    return Object.assign({}, state, {hasNewNotifications: action.hasNewNotifications});
  default:
    return state;
  }
};

export default NotificationReducer;