import React, {Component} from 'react';

class Notifications extends Component {
  componentDidMount() {
    this.props.newNotification(true);
  }
  render() {
    return (
      <div>
        <h2>Notifications</h2>
        {'Props' + this.props.hasNewNotifications}
      </div>
    );
  }
}

export default Notifications;
