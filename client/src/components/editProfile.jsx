import React from 'react';

class EditProfile extends React.Component {
  state ={}

  componentDidMount() {
    this.props.fetchProfileDetails(this.props.currentUserId);
  }

  render() {
    return (
      <div>Hello</div>
    );
  }
}

export default EditProfile;