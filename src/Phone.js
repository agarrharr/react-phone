import React, { Component } from 'react';
import Menu from './Menu';
import Statusbar from './Statusbar';
import Homescreen from './Homescreen';
import Buttons from './Buttons';
import './Phone.css';


class Phone extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuItems: ['View', 'Cancel'],
      selectedItem: 0,
      isMenuOpen: false,
      date: new Date(),
      settings: {
        isMilitaryTime: true,
        showCarrier: true
      },
      batteryLevel: 100,
      isBluetoothOn: false,
      volumeLevel: 0,
      info: {
        carrier: 'T-Mobile'
      },
      isLocked: true,
      notifications: [
        {
          type: 'New message',
          message: 'Douglas Adams Mobile'
        }
      ]
    };

    this.handleUpClick = this.handleUpClick.bind(this);
    this.handleDownClick = this.handleDownClick.bind(this);
  }

  handleDownClick() {
    const selectedItem = this.state.selectedItem + (this.state.selectedItem >= this.state.menuItems.length - 1 ? 0 : 1);

    this.setState({
      selectedItem: selectedItem
    });
  }

  componentWillMount() {
    this.timeInterval = setInterval(() => {
      this.setState({
        date: new Date()
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timeInterval);
  }

  handleUpClick() {
    const selectedItem = this.state.selectedItem + (this.state.selectedItem < 1 ? 0 : -1);

    this.setState({
      selectedItem
    });
  }

  render() {
    const menu = <Menu title="New message" items={this.state.menuItems} selectedItem={this.state.selectedItem} />;
    const homescreen = <Homescreen date={this.state.date} isMilitaryTime={this.state.settings.isMilitaryTime} notifications={this.state.notifications} />;
    const screen = this.state.isMenuOpen ? menu : homescreen;
    return (
        <div className="Phone">
          <div className="Phone__screen">
            <Statusbar carrier={this.state.info.carrier} volumeLevel={this.state.volumeLevel} batteryLevel={this.state.batteryLevel} isBluetoothOn={this.state.isBluetoothOn} />
            {screen}
          </div>
          <Buttons onUpClick={this.handleUpClick} onDownClick={this.handleDownClick} />
        </div>
    );
  }
}

export default Phone;
