import React, { Component } from 'react';
import { Navbar, Nav, NavItem} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Search from '../containers/searchContainer';
import Notifications from '../containers/notificationContainer';

class NavBar extends Component {
  
  render() {
    return (
      <div>
        <Navbar default collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Peddle</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Search />
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem eventKey={8} componentClass={Link} href="/" to="/">
                {"Welcome " + this.props.greetFriends}
              </NavItem>
              <NavItem eventKey={1} componentClass={Link} href="/profile/1" to="/profile/1">
                My Account
              </NavItem>
              <NavItem eventKey={9} componentClass={Link} href="/sellerDashboard" to="/sellerDashboard">
                Sell
              </NavItem>
              <NavItem eventKey={2} componentClass={Link} href="/orders" to="/orders">
                Orders
              </NavItem>
              <NavItem eventKey={3} componentClass={Link} href="/" to="/">
                Watch List
              </NavItem>
              <NavItem eventKey={4} componentClass={Link} href="/cart" to="/cart">
                Cart
              </NavItem>
              <NavItem eventKey={5} componentClass={Link} href="/messages" to="/messages">
                Messages
              </NavItem>
              <NavItem eventKey={6} componentClass={Link} href="/login" to="/login">
                Login
              </NavItem>
              <NavItem eventKey={7} componentClass={Link} href="/" to="/" onFocus={e => this.props.handleLogout(e)}>Logout
              </NavItem>
              <Notifications />
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;