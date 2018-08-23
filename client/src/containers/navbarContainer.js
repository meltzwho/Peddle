import { connect } from 'react-redux';
import NavBar from '../components/Navbar';

const mapStateToProps = (state) => {
  return {
    currentUserId: state.user.userId
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

const NavBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);

export default NavBarContainer;
