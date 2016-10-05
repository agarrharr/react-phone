import React, { Component } from 'react';
import Menu from './Menu';
import Buttons from './Buttons';
import './Phone.css';

let defaultOption = 0;

class Phone extends Component {
  render() {
    const options = ['View', 'Cancel'];
    const menuOptions = options.map((option, i) => ({
      name: option,
      default: defaultOption === i
    }));

    return (
        <div className="Phone">
          <div className="Phone__screen">
            <Menu title="New message" options={menuOptions} />
          </div>
          <Buttons />
        </div>
    );
  }
}

export default Phone;
