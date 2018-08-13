import { connect } from 'react-redux';
import {requestCategories, receiveCategories} from '../actions/sellEntryAction.js';
import SellEntry from '../components/SellEntry.jsx';
import axios from 'axios';

const mapStateToProps = (state) => {
  return {
    entry: state.sellEntryReducer.entry
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

    fetchCategories: () => {
      dispatch(requestCategories())
      axios.get('/sellEntry/categories')
        .then(response => {
          dispatch(receiveCategories(response.data)),
          error => console.log('an error occured', error)
        })
      }

  };
};

var SellEntryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SellEntry);

export default SellEntryContainer;
