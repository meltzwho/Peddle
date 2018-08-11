import React, {Component} from 'react';

class Notifications extends Component {
  componentDidMount() {
    this.props.newNotification(true);
  }
  render() {
    return (
      <div>
        {'Props'+this.props.hasNewNotifications}
      </div>
    );
  }
}

export default Notifications;
