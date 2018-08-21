import { connect } from 'react-redux';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { addUser } from '../actions/appAction';
import App from '../components/App';

const mapStateToProps = (state) => {
  return {
    currentUserId: state.user.userId
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addUserToStore: (user) => {
      console.log('hello in the container', user)
      dispatch(addUser(user));
    }
  }
};

const appContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default withRouter(appContainer);