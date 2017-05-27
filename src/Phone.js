import React, {Component} from 'react';
import Buttons from './Buttons';
import './Phone.css';

class Phone extends Component {
  render() {
    return (
      <div className="Phone">
        <div className="Phone__screen">
          {this.props.children}
        </div>
        <Buttons />
      </div>
    );
  }
}

export default Phone;

