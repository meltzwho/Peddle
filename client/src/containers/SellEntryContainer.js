import { connect } from 'react-redux';
import SellEntry from '../components/SellEntry.jsx';
// import actions;


const mapStateToProps = (state) => {
  // return {
  //   prop: state.prop
  // }
};

const mapDispatchToProps = (dispatch) => {
  return {
    //need to create action
    handleProductChange: (q) => dispatch(action(thing))
  };
};

var Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);

export default Container;
