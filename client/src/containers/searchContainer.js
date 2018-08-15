import { connect } from 'react-redux';
import searchAction from '../actions/searchAction';
import Search from '../components/Search';

const mapStateToProps = (state) => {
  return {
    input: state.search.input,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSubmit: (input) => {
      dispatch(searchAction(input));
    }
  };
};

const SearchContainer = connect(
  mapStateToProps, 
  mapDispatchToProps
)(Search);

export default SearchContainer;