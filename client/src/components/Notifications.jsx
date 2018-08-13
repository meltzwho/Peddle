import React, {Component} from 'react';
import axios from 'axios';

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifList: new Array()
    };
  }
  componentDidMount() {
    //axios.get('/notifs');
  }
  render() {
    return (
      <div>
        {'Props' + this.props.hasNewNotifications}
      </div>
    );
  }
}

export default Notifications;
