import React, { Component } from 'react';
import Menu from './Menu';
import Homescreen from './Homescreen';
import Buttons from './Buttons';
import './Phone.css';


class Phone extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedItem: 0,
      menuItems: ['View', 'Cancel'],
      isMenuOpen: false,
      date: new Date()
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

  componentWillMount() {
    setInterval(() => {
      this.setState({
        date: new Date()
      });
    }, 1000);
  }

  handleUpClick() {
    let selectedItem = this.state.selectedItem + (this.state.selectedItem < 1 ? 0 : -1);

    this.setState({
      selectedItem
    });
  }

  render() {
    let menu = <Menu title="New message" items={this.state.menuItems} selectedItem={this.state.selectedItem} />;
    let homescreen = <Homescreen date={this.state.date} />;
    let screen = this.state.isMenuOpen ? menu : homescreen;
    return (
        <div className="Phone">
          <div className="Phone__screen">
            {screen}
          </div>
          <Buttons onUpClick={this.handleUpClick} onDownClick={this.handleDownClick} />
        </div>
    );
  }
}

export default Phone;
