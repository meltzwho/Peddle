import { connect } from 'react-redux';
import searchAction from '../actions/searchAction';
import Search from '../components/Search.jsx';

const mapStateToProps = (state) => {
  console.log(state)
  return {
    input: state.searchReducer.input,
  };
};

const mapDispatchToProps = (dispatch) => ({
  handleInputchange: (newInput) => {
    dispatch(searchAction(newInput));
  }
});

const SearchContainer = connect(
  mapStateToProps, 
  mapDispatchToProps
)(Search);

export default SearchContainer;