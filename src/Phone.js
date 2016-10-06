import React, { Component } from 'react';
import Alert from './Alert';
import Menu from './Menu';
import Statusbar from './Statusbar';
import Homescreen from './Homescreen';
import Buttons from './Buttons';
import './Phone.css';

const SCREEN_STATES = {
  LOCKED: 'LOCKED',
  ALERT: 'ALERT',
  MENU: 'MENU',
  HOMESCREEN: 'HOMESCREEN'
};

class Phone extends Component {
  constructor() {
    super(...arguments);

    this.state = {
      alertItems: [],
      alertSelectedItem: 0,
      screenState: SCREEN_STATES.HOMESCREEN,
      menuTitle: '',
      menuItems: [],
      date: new Date(),
      settings: {
        isMilitaryTime: true,
        showCarrier: true,
      },
      batteryLevel: 100,
      isBluetoothOn: true,
      volumeLevel: 0,
      info: {
        carrier: 'T-Mobile',
      },
      messages: [
        {
          message: 'Douglas Adams Mobile',
          viewed: false,
          hasShownAlert: false,
        },
        {
          message: 'Steve Wozniak Mobile',
          viewed: false,
          hasShownAlert: false,
        },
      ],
      missedCalls: [
        {
          message: 'Douglas Adams Mobile',
          hasShownAlert: false,
        },
      ],
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
    if (this.state.screenState === SCREEN_STATES.LOCKED) { return; }
    this.setState({
      alertSelectedItem: this.state.alertSelectedItem + (this.state.alertSelectedItem < 1 ? 0 : -1)
    });
  }

  handleDownClick() {
    if (this.state.screenState === SCREEN_STATES.LOCKED) { return; }
    this.setState({
      alertSelectedItem: this.state.alertSelectedItem + (this.state.alertSelectedItem >= this.state.alertItems.length - 1 ? 0 : 1)
    });
  }

  handleLockClick() {
    const isLocked = (this.state.screenState === SCREEN_STATES.HOMESCREEN) ? this.state.isLocked : !this.state.isLocked;
    this.setState({
      screenState: isLocked ? SCREEN_STATES.LOCKED : this.state.screenState
    }, this.goHome);
  }

  handleSelectClick() {
    if (this.state.screenState === SCREEN_STATES.LOCKED) { return; }
    if (this.state.screenState === SCREEN_STATES.ALERT) {
      if (this.state.alertItems[this.state.alertSelectedItem] === 'View') {
        if (this.getAlertType() === 'messages') {
          this.goToMessages();
        } else if (this.getAlertType() === 'missed calls') {
          this.goToMissedCalls();
        }
      } else if (this.state.alertItems[this.state.alertSelectedItem] === 'Cancel') {
        if (this.getAlertType() === 'messages') {
          this.setState({
            messages: this.state.messages.map(n => Object.assign({}, n, {hasShownAlert: true})),
            screenState: SCREEN_STATES.HOMESCREEN
          });
        } else if (this.getAlertType() === 'missed calls') {
          this.setState({
            missedCalls: this.state.missedCalls.map(n => Object.assign({}, n, {hasShownAlert: true})),
            screenState: SCREEN_STATES.HOMESCREEN
          });
        }
      }
    }
  }

  handleEndCallClick() {
    if (this.state.screenState === SCREEN_STATES.LOCKED) { return; }
    this.goHome();
  }

  handleCallClick() {
    if (this.state.screenState === SCREEN_STATES.LOCKED) { return; }
    if (this.state.screenState !== SCREEN_STATES.HOMESCREEN) { return; }
    this.goToMissedCalls();
  }

  goHome() {
    const unreadMessageNotifications = this.state.messages.filter(notification => !notification.hasShownAlert);
    const unreadMissedCallNotifications = this.state.missedCalls.filter(notification => !notification.hasShownAlert);
    const hasUnreadMessages = unreadMessageNotifications.length > 0;
    const hasUnreadMissedCalls = unreadMissedCallNotifications.length > 0;
    const isAlertOpen = hasUnreadMessages || hasUnreadMissedCalls;

    this.setState({
      alertItems: ['View', 'Cancel'],
      alertSelectedItem: 0,
      screenState: isAlertOpen ? SCREEN_STATES.ALERT : SCREEN_STATES.HOMESCREEN,
    });
  }

  getAlertType() {
    const unreadMessageNotifications = this.state.messages.filter(notification => !notification.hasShownAlert);
    const unreadMissedCallNotifications = this.state.missedCalls.filter(notification => !notification.hasShownAlert);
    const hasUnreadMessages = unreadMessageNotifications.length > 0;
    const hasUnreadMissedCalls = unreadMissedCallNotifications.length > 0;
    const alertType = hasUnreadMessages ? 'messages' : hasUnreadMissedCalls ? 'missed calls' : null;
    return alertType;
  }

  goToMessages() {
    this.setState({
      messages: this.state.messages.map(n => ({message: n.message, hasShownAlert: true})),
      screenState: SCREEN_STATES.MENU,
      menuTitle: 'Messages',
      menuItems: []
    });
  }

  goToMissedCalls() {
    this.setState({
      missedCalls: [],
      screenState: SCREEN_STATES.MENU,
      menuTitle: 'Call history',
      menuItems: []
    });
  }

  render() {
    const unreadMessageNotifications = this.state.messages.filter(notification => !notification.hasShownAlert);
    const unreadMissedCallNotifications = this.state.missedCalls.filter(notification => !notification.hasShownAlert);
    const alertTitle = unreadMessageNotifications.length > 0 ?
      `New message${unreadMessageNotifications.length > 1 ? 's' : ''}` :
      unreadMissedCallNotifications.length > 0 ?
      `Missed call${unreadMissedCallNotifications.length > 1 ? 's' : ''}` :
      '';
    const alert = <Alert title={alertTitle} items={this.state.alertItems} selectedItem={this.state.alertSelectedItem} />;
    const menu = <Menu title={this.state.menuTitle} items={this.state.menuItems} />;
    const homescreen = <Homescreen date={this.state.date} isMilitaryTime={this.state.settings.isMilitaryTime} messageNotifications={this.state.messages} missedCallNotifications={this.state.missedCalls} />;
    const statusbar = this.state.screenState === SCREEN_STATES.HOMESCREEN ? <Statusbar isLocked={this.state.screenState === SCREEN_STATES.LOCKED} volumeLevel={this.state.volumeLevel} batteryLevel={this.state.batteryLevel} isBluetoothOn={this.state.isBluetoothOn} carrier={this.state.info.carrier} /> : null;

    let screen;
    switch(this.state.screenState) {
      case SCREEN_STATES.HOMESCREEN:
        screen = homescreen;
        break;
      case SCREEN_STATES.ALERT:
        screen = alert;
        break;
      case SCREEN_STATES.MENU:
        screen = menu;
        break;
      default:
        screen = homescreen;
        break;
    }

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
