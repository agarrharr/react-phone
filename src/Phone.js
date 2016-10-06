import React, { Component } from 'react';
import Alert from './Alert';
import Menu from './Menu';
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
      isMenuOpen: false,
      menuTitle: '',
      menuItems: [],
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
    this.handleLockClick = this.handleLockClick.bind(this);
    this.handleSelectClick = this.handleSelectClick.bind(this);
    this.handleEndCallClick = this.handleEndCallClick.bind(this);
    this.handleCallClick = this.handleCallClick.bind(this);
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
    if (this.state.isLocked) { return; }
    this.setState({
      alertSelectedItem: this.state.alertSelectedItem + (this.state.alertSelectedItem < 1 ? 0 : -1)
    });
  }

  handleDownClick() {
    if (this.state.isLocked) { return; }
    this.setState({
      alertSelectedItem: this.state.alertSelectedItem + (this.state.alertSelectedItem >= this.state.alertItems.length - 1 ? 0 : 1)
    });
  }

  handleLockClick() {
    this.setState({isLocked: (this.state.isAlertOpen || this.state.isMenuOpen) ? this.state.isLocked : !this.state.isLocked}, this.goHome);
  }

  handleSelectClick() {
    if (this.state.isLocked) { return; }
    if (this.state.isAlertOpen) {
      if (this.state.alertItems[this.state.alertSelectedItem] === 'View') {
        if (this.state.alertType === 'messages') {
          this.goToMessages();
        } else if (this.state.alertType === 'missed calls') {
          this.goToMissedCalls();
        }
      } else if (this.state.alertItems[this.state.alertSelectedItem] === 'Cancel') {
        this.markCurrentAlertsAsRead();
      }
    }
  }

  handleEndCallClick() {
    if (this.state.isLocked) { return; }
    if (this.state.isAlertOpen) {
      this.markCurrentAlertsAsRead();
    } else {
      this.goHome();
    }
  }

  handleCallClick() {
    if (this.state.isLocked) { return; }
    if (this.state.isMenuOpen || this.state.isAlertOpen) {
      return;
    }
    this.goToMissedCalls();
  }

  markCurrentAlertsAsRead() {
    if (this.state.alertType === 'messages') {
      this.markAllMessagesAsRead(this.goHome);
    } else if (this.state.alertType === 'missed calls') {
      this.markAllMissedCallsAsRead(this.goHome);
    }
  }

  markAllMessagesAsRead(callback) {
    this.setState({
      messageNotifications: this.state.messageNotifications.map(n => ({message: n.message, hasShownAlert: true}))
    }, callback);
  }

  markAllMissedCallsAsRead(callback) {
    this.setState({
      missedCallNotifications: this.state.missedCallNotifications.map(n => ({message: n.message, hasShownAlert: true}))
    }, callback);
  }

  goHome() {
    this.setState({
      isAlertOpen: false,
      isMenuOpen: false
    }, this.showAlerts);
  }

  showAlerts() {
    const unreadMessageNotifications = this.state.messageNotifications.filter(notification => !notification.hasShownAlert);
    const unreadMissedCallNotifications = this.state.missedCallNotifications.filter(notification => !notification.hasShownAlert);
    let alertTitle = '';
    let alertType = '';
    let isAlertOpen = true;
    if (this.state.isMenuOpen || this.state.isAlertOpen) {
      return;
    }
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
      isAlertOpen,
      isMenuOpen: false
    });
  }

  goToMessages() {
    this.markAllMessagesAsRead();
    this.setState({
      isAlertOpen: false,
      isMenuOpen: true,
      menuTitle: 'Messages',
      menuItems: []
    });
  }

  goToMissedCalls() {
    this.markAllMissedCallsAsRead();
    this.setState({
      isAlertOpen: false,
      isMenuOpen: true,
      menuTitle: 'Call history',
      menuItems: [],
      missedCallNotifications: []
    });
  }

  render() {
    const alert = this.state.isAlertOpen ? <Alert title={this.state.alertTitle} items={this.state.alertItems} selectedItem={this.state.alertSelectedItem} /> : null;
    const menu = this.state.isMenuOpen ? <Menu title={this.state.menuTitle} items={this.state.menuItems} /> : null;
    const homescreen = <Homescreen date={this.state.date} isMilitaryTime={this.state.settings.isMilitaryTime} messageNotifications={this.state.messageNotifications} missedCallNotifications={this.state.missedCallNotifications} />;
    const statusbar = this.state.isAlertOpen || this.state.isMenuOpen ? null : <Statusbar isLocked={this.state.isLocked} volumeLevel={this.state.volumeLevel} batteryLevel={this.state.batteryLevel} isBluetoothOn={this.state.isBluetoothOn} carrier={this.state.info.carrier} />;
    const screen = this.state.isAlertOpen ? alert : this.state.isMenuOpen ? menu : homescreen;

    return (
        <div className="Phone">
          <div className="Phone__screen">
            {statusbar}
            {screen}
          </div>
          <Buttons
            onUpClick={this.handleUpClick}
            onDownClick={this.handleDownClick}
            onLockClick={this.handleLockClick}
            onSelectClick={this.handleSelectClick}
            onEndCallClick={this.handleEndCallClick}
            onCallClick={this.handleCallClick}
          />
        </div>
    );
  }
}

export default Phone;
