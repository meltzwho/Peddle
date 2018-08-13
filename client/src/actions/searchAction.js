const searchAction = (input) => ({
  type: 'UPDATE_INPUT',
  payload: {
    input: input,
  }
});

export default searchAction;