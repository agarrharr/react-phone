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
      alertType: '',
      alertTitle: '',
      alertItems: [],
      // TODO: move this into Alert
      alertSelectedItem: 0,
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
    this.handleSelectClick = this.handleSelectClick.bind(this);
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
      alertSelectedItem: this.state.alertSelectedItem + (this.state.alertSelectedItem < 1 ? 0 : -1)
    });
  }

  handleDownClick() {
    this.setState({
      alertSelectedItem: this.state.alertSelectedItem + (this.state.alertSelectedItem >= this.state.alertItems.length - 1 ? 0 : 1)
    });
  }

  handleUnlockClick() {
    this.setState({isLocked: !this.state.isAlertOpen ? !this.state.isLocked : this.state.isLocked}, this.goHome);
  }

  handleSelectClick() {
    if (this.state.isAlertOpen) {
      if (this.state.alertItems[this.state.alertSelectedItem] === 'View') {
      } else {
        if (this.state.alertType === 'messages') {
          this.markAllMessagesAsRead();
        } else if (this.state.alertType === 'missed calls') {
          this.markAllMissedCallsAsRead();
        }
      }
    }
  }

  markAllMessagesAsRead() {
    this.setState({
      messageNotifications: this.state.messageNotifications.map(n => ({message: n.message, hasShownAlert: true}))
    }, this.goHome);
  }

  markAllMissedCallsAsRead() {
    this.setState({
      missedCallNotifications: this.state.missedCallNotifications.map(n => ({message: n.message, hasShownAlert: true}))
    }, this.goHome);
  }

  goHome() {
    const unreadMessageNotifications = this.state.messageNotifications.filter(notification => !notification.hasShownAlert);
    const unreadMissedCallNotifications = this.state.missedCallNotifications.filter(notification => !notification.hasShownAlert);
    let alertTitle = '';
    let alertType = '';
    let isAlertOpen = true;
    if (unreadMessageNotifications.length > 0) {
      alertTitle = `New message${unreadMessageNotifications.length > 1 ? 's' : ''}`;
      alertType = 'messages';
    } else if (unreadMissedCallNotifications.length > 0) {
      alertTitle = `Missed call${unreadMissedCallNotifications.length > 1 ? 's' : ''}`;
      alertType = 'missed calls';
    } else {
      isAlertOpen = false;
    }
    this.setState({
      alertTitle,
      alertType,
      alertItems: ['View', 'Cancel'],
      alertSelectedItem: 0,
      isAlertOpen
    });
  }

  render() {
    const alert = <Alert title={this.state.alertTitle} items={this.state.alertItems} selectedItem={this.state.alertSelectedItem} />;
    const homescreen = <Homescreen date={this.state.date} isMilitaryTime={this.state.settings.isMilitaryTime} messageNotifications={this.state.messageNotifications} missedCallNotifications={this.state.missedCallNotifications} />;
    const statusbar = this.state.isAlertOpen ? null : <Statusbar isLocked={this.state.isLocked} volumeLevel={this.state.volumeLevel} batteryLevel={this.state.batteryLevel} isBluetoothOn={this.state.isBluetoothOn} carrier={this.state.info.carrier} />;
    const screen = this.state.isAlertOpen ? alert : homescreen;

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
            onSelectClick={this.handleSelectClick}
          />
        </div>
    );
  }
}

export default Phone;
