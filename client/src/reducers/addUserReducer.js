const addUserReducer = (state = {
  firstname: '',
  lastname: '',
  email: '',
  username: '',
  password: ''
}, action) => {
  switch (action.type) {
    case 'ADD_USER':
      var obj = Object.assign({}, state, {input: action.payload.input});
      return obj;
    default:
      return state;
  }
};

export default addUserReducer;
