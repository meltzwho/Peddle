import React, {Component} from 'react';
import axios from 'axios';
import {DropdownButton, MenuItem} from 'react-bootstrap';

class Notifications extends Component {
  state = {
      notifList: new Array()
  };

  componentDidMount() {
    //axios.get('/notifs');
  }
  render() {
    return (
      <div>
        <DropdownButton
      bsStyle='default'
      // title={}
      key='notifs'
      id={`dropdown-basic-0`}
    >
      <MenuItem eventKey="1">Action</MenuItem>
    </DropdownButton>
    </div>
    );
  }
}

export default Notifications;
