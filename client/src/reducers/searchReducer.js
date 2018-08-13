const searchReducer = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_INPUT':
      let obj = Object.assign({}, state, {handleInputChange: action.payload.handleInputChange});
      return obj;
    default:
      return state;
  }
};

export default searchReducer;