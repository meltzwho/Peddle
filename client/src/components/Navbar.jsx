import React, { Component } from 'react';
import { Grid, Row, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Search from '../containers/searchContainer';
import Notifications from '../containers/notificationContainer';
import './assets/Home.css';

class NavBar extends Component {
  
  render() {
    return (
      <div className="nav_flex">
        
        
       
        <div>
          <Search />
        </div>
      </div>
    );
  }
}

export default NavBar;