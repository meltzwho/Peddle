const appReducer = (state = {userId: null, isAuth: false}, action) => {
  switch (action.type) {
    case 'ADD_USER_TO_STORE':
      return Object.assign({}, state, {userId: action.payload.userId, isAuth: true});
    case 'REMOVE_USER_FROM_STORE':
      return Object.assign({}, state, {userId: null, isAuth: false});
    default:
      return state;
  }
};

export default appReducer;