const searchAction = ({input}) => ({
  type: 'UPDATE_INPUT',
  payload: {
    input,
    handleInputChange: (e) => {
      input = e.target.value;
    }
  }
});

export default searchAction;