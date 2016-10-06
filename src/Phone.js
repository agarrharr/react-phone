import React, { Component } from 'react';
import Alert from './Alert';
import Statusbar from './Statusbar';
import Homescreen from './Homescreen';
import Buttons from './Buttons';
import './Phone.css';


class Phone extends Component {
  constructor() {
    super(...arguments);

    this.state = {
      menuItems: ['View', 'Cancel'],
      selectedItem: 0,
      isAlertOpen: false,
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
      messageNotifications: [
        {
          message: 'Douglas Adams Mobile',
          hasShownAlert: false
        },
        {
          message: 'Steve Wozniak Mobile',
          hasShownAlert: false
        },
      ],
      missedCallNotifications: [
        {
          message: 'Douglas Adams Mobile',
          hasShownAlert: false
        }
      ]
    };

    this.handleUpClick = this.handleUpClick.bind(this);
    this.handleDownClick = this.handleDownClick.bind(this);
    this.handleUnlockClick = this.handleUnlockClick.bind(this);
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
    this.setState({
      selectedItem: this.state.selectedItem + (this.state.selectedItem < 1 ? 0 : -1)
    });
  }

  handleDownClick() {
    this.setState({
      selectedItem: this.state.selectedItem + (this.state.selectedItem >= this.state.menuItems.length - 1 ? 0 : 1)
    });
  }

  handleUnlockClick() {
    this.setState({isLocked: !this.state.isAlertOpen ? !this.state.isLocked : this.state.isLocked}, this.lockScreen);
  }

  lockScreen() {
    if (!this.state.isLocked) {
      const unshownNotifications = this.state.messageNotifications.filter(notification => !notification.hasShownAlert);
      if (unshownNotifications.length > 0) {
        this.setState({isAlertOpen: true});
      }
    }
  }

  render() {
    const menu = <Alert title="New message" items={this.state.menuItems} selectedItem={this.state.selectedItem} />;
    const homescreen = <Homescreen date={this.state.date} isMilitaryTime={this.state.settings.isMilitaryTime} messageNotifications={this.state.messageNotifications} missedCallNotifications={this.state.missedCallNotifications} />;
    const statusbar = this.state.isAlertOpen ? null : <Statusbar isLocked={this.state.isLocked} volumeLevel={this.state.volumeLevel} batteryLevel={this.state.batteryLevel} isBluetoothOn={this.state.isBluetoothOn} carrier={this.state.info.carrier} />;
    const screen = this.state.isAlertOpen ? menu : homescreen;

    return (
        <div className="Phone">
          <div className="Phone__screen">
            {statusbar}
            {screen}
          </div>
          <Buttons
            onUpClick={this.handleUpClick}
            onDownClick={this.handleDownClick}
            onUnlockClick={this.handleUnlockClick}
          />
        </div>
    );
  }
}

export default Phone;
