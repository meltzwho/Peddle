import { connect } from 'react-redux';
import searchAction from '../actions/searchAction';
import Search from '../components/Search.jsx';

const mapStateToProps = (state) => {
  return {
    input: state.searchReducer.input,
    handleInputChange: state.searchReducer.handleInputChange
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleInputChange: (input) => {
      dispatch(searchAction(input));
    }
  };
};

const SearchContainer = connect(
  mapStateToProps, 
  mapDispatchToProps
)(Search);

export default SearchContainer;