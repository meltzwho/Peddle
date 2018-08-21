export const addUser = (user) => ({
  type: 'ADD_USER_TO_STORE',
  payload: {
    userId: user
  }
});