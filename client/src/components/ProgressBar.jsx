import React, {Component} from 'react';
import { ProgressBar } from 'react-bootstrap';

class ProgressBarComponent extends Component {
  state = {}

  componentDidMount() {
    console.log('this props for progress', this.props)
    this.props.fetchProgress(this.props.listingId);
  }

  render() {
    console.log(this.props)
    let barFill = 0;
    if (this.props.progress.active) {
      barFill += 25;
    }
    if (this.props.progress.sold) {
      barFill += 25;
    }
    if (this.props.progress.shipped) {
      barFill += 25;
    }
    if (this.props.progress.completed) {
      barFill += 25;
    }

    return (
      <div>
        <ProgressBar bsStyle="success" now={barFill} />
      </div>
    );
  }
}
export default ProgressBarComponent;