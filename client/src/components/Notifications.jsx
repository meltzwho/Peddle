import React, {Component} from 'react';

class Notifications extends Component {
  componentDidMount() {
    this.props.newNotification(true);
  }
  render() {
    return (
      <div>
        {JSON.stringify(this.props.hasNewNotifications)}<br/>
        {JSON.stringify(this.props)}
      </div>
    );
  }
}

export default Notifications;