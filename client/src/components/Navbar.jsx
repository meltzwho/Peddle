import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Search from '../containers/searchContainer.js';

class NavBar extends Component {
  render() {
    return (
      <div>
        <Navbar default collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Peddle</Link>
            </Navbar.Brand>
          </Navbar.Header>
          <Search />
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem eventKey={1} componentClass={Link} href="/" to="/">
                Profile
              </NavItem>
              <NavItem eventKey={2} componentClass={Link} href="/" to="/">
                Orders
              </NavItem>
              <NavItem eventKey={3} componentClass={Link} href="/" to="/">
                Watch List
              </NavItem>
              <NavItem eventKey={4} componentClass={Link} href="/" to="/">
                Cart
              </NavItem>
              <NavItem eventKey={5} componentClass={Link} href="/" to="/">
                Profile
              </NavItem>
              <NavItem eventKey={6} componentClass={Link} href="/" to="/">
                Messages
              </NavItem>
              <NavItem eventKey={8} componentClass={Link} href="/" to="/">
                Logout
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;