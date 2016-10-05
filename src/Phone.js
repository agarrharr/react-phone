import React, { Component } from 'react';
import Menu from './Menu';
import Buttons from './Buttons';
import './Phone.css';


class Phone extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedItem: 0,
      menuItems: ['View', 'Cancel'],
      isMenuOpen: true
    };

    this.handleUpClick = this.handleUpClick.bind(this);
    this.handleDownClick = this.handleDownClick.bind(this);
  }

  handleDownClick() {
    let selectedItem = this.state.selectedItem + (this.state.selectedItem >= this.state.menuItems.length - 1 ? 0 : 1);

    this.setState({
      selectedItem: selectedItem
    });
  }

  handleUpClick() {
    let selectedItem = this.state.selectedItem + (this.state.selectedItem < 1 ? 0 : -1);

    this.setState({
      selectedItem
    });
  }

  render() {
    return (
        <div className="Phone">
          <div className="Phone__screen">
            <Menu title="New message" items={this.state.menuItems} selectedItem={this.state.selectedItem} />
          </div>
          <Buttons onUpClick={this.handleUpClick} onDownClick={this.handleDownClick} />
        </div>
    );
  }
}

export default Phone;
