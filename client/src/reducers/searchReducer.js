const searchReducer = (state = {input: 'hello world'}, action) => {
  switch (action.type) {
    case 'UPDATE_INPUT':
      let obj = Object.assign({}, state, {input: action.payload.input})
      return obj;
    default:
      return state;
  }
};