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
<<<<<<< HEAD
        <DropdownButton
      bsStyle='default'
      title={}
      key='notifs'
      id={`dropdown-basic-0`}
    >
      <MenuItem eventKey="1">Action</MenuItem>
    </DropdownButton>
    </div>
=======
        <h2>Notifications</h2>
        {'Props' + this.props.hasNewNotifications}
      </div>
>>>>>>> 82536546621a366283983b42f686113629529be8
    );
  }
}

export default Notifications;
