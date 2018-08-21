import { connect } from 'react-redux';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { loginAction, SignupAction } from '../actions/appAction';
import App from '../components/App';

const mapStateToProps = (state) => {
  return {
    
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: () => {
      dispatch(loginAction());
      axios.post()
        .then(response => { 
          dispatch(SignupAction(response.data))
        });
    },
    signupUser: () => {

    },
    logoutUser: () => {

    }
  };
};

const appContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default withRouter(appContainer);