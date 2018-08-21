const appReducer = (state = {userId: null}, action) => {
  switch (action.type) {
    case 'ADD_USER_TO_STORE':
      return Object.assign({}, state, {userId: action.payload.userId});
    default:
      return state;
  }
};

export default appReducer;