import { connect } from 'react-redux';
import Search from '../components/Search.jsx';
import { updateSearch } from '../actions/searchAction';
import { bindActionCreators } from 'redux';
const mapStateToProps = (state, props) => ({
  input: state.input,
});

const mapActionsToProps = (dispatch, props) => {
  return bindActionCreators({
    handleInputchange: updateSearch
  }, dispatch);
};
const mergeProps = (propsFromState, propsFromDispatch, ownProps) => {
  
};
export default connect(mapStateToProps, mapActionsToProps)(Search);