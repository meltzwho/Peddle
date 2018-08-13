// let NotificationReducer = (state = {hasNewNotifications: false}, action) => {
//   switch (action.type){
//   case 'HAS_NEW_NOTIFICATIONS':
//     let obj = Object.assign({}, state, {hasNewNotifications: action.hasNewNotifications});
//     return obj;
//   default:
//     return state;
//   }
// };

// export default NotificationReducer;

let SellEntryReducer = (state = { entry: {
  productName: '',
  productDescription: '',
  productPrice: 0,
  allowPickup: false,
  allowShipping: false
}}, action) => {
  switch (action.type) {
  case 'EDIT_EXISTING_LISTING':
    let obj = Object.assign({}, state, action.editExistingListing);
    return obj;
  default:
    return state;
  }
};

export default SellEntryReducer;