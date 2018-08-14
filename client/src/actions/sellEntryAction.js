// const hasNewNotifications = (hasNewNotifications) => ({
//   type: 'HAS_NEW_NOTIFICATIONS',
//   hasNewNotifications: hasNewNotifications
// });

// export default hasNewNotifications;

const requestCategories = () => {
  return {
    type: 'REQUEST_CATEGORIES'
  }
}

const receiveCategories = (categories) => {
  return {
    type: "RECEIVE_CATEGORIES",
    categories: categories.map((category) => category)
  }
}

exports.requestCategories = requestCategories;
exports.receiveCategories = receiveCategories;