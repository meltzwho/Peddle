import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Row, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Search from '../containers/searchContainer';
import Notifications from '../containers/notificationContainer';

class NavBar extends Component {
  render() {
    return (
      <Navbar default collapseOnSelect staticTop>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">
              <img 
                className="text-logo"
                src="/assets/logo-peddle.jpg" 
                alt="text logo"
                style={{
                  height: "50px",
                  width: "150px",
                  objectFit: "contain",
                  marginTop: "-15px"
                }}
              />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Search />
        <Navbar.Collapse>
          <Nav pullRight>
            {this.props.currentUserId ? 
              (
                <NavDropdown eventKey={1} title={this.props.currentuser.first_name + "'s Account"} id="basic-nav-dropdown">
                  <MenuItem eventKey={1.1} componentClass={Link} href={`/profile/${this.props.currentUserId}`} to={`/profile/${this.props.currentUserId}`}>Profile</MenuItem>
                  <MenuItem eventKey={1.2} componentClass={Link} href="/sellerDashboard" to="/sellerDashboard">Sell</MenuItem>
                  <MenuItem eventKey={1.3} componentClass={Link} href="/messages" to="/messages">Messages</MenuItem>
                  <MenuItem eventKey={1.7} componentClass={Link} href="/" to='/' onMouseDown={e => this.props.handleLogout(e)}>Logout</MenuItem>
                </NavDropdown>)
              : (
                <NavDropdown eventKey={1} title={this.props.currentuser.first_name === 'Guest' ? 'My Account' : `${this.props.currentuser.first_name}'s Account`} id="basic-nav-dropdown">
                  <MenuItem eventKey={1.4} componentClass={Link} href="/login" to="/login">Login</MenuItem>
                  <MenuItem eventKey={1.4} componentClass={Link} href="/signup" to="/signup">Sign Up</MenuItem>
                </NavDropdown>)
            }
            <NavItem eventKey={2} componentClass={Link} href="/orders" to="/orders">
              Orders
            </NavItem>
            <NavItem eventKey={3} componentClass={Link} href="/cart" to="/cart">
              Cart
            </NavItem>
            <Notifications />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;