const searchReducer = (state = {input: ''}, action) => {
  switch (action.type) {
    case 'UPDATE_INPUT':
      var obj = Object.assign({}, state, {input: action.payload.input});
      return obj;
    default:
      return state;
  }
};

export default searchReducer;