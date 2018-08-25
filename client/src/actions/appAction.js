export const addUser = (user) => ({
  type: 'ADD_USER_TO_STORE',
  payload: {
    userId: user
  }
});

export const removeUser = () => ({type: 'REMOVE_USER_FROM_STORE'});