import { connect } from 'react-redux';
// import sellEntry from '../action/sellEntryAction.js';
import SellEntry from '../components/SellEntry.jsx';

const mapStateToProps = (state) => {
  return {
    entry: state.sellEntryReducer.entry
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //need to create action
    handleProductChange: (q) => dispatch(action(thing))
  };
};

var SellEntryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SellEntry);

export default SellEntryContainer;
