export const newNotifications = (notifications) => ({
  type: 'NEW_NOTIFICATIONS',
  notifications: notifications
});

export const wipeNotifications = () => ({type: 'WIPE_NOTIFICATIONS'});