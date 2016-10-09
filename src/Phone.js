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
      alertItems: ['View', 'Cancel'],
      alertSelectedItem: 0,
      screenState: SCREEN_STATES.LOCKED,
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
      signalStrength: 0,
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
    const isLocked = this.state.screenState === SCREEN_STATES.HOMESCREEN;
    this.setState({
      screenState: isLocked ? SCREEN_STATES.LOCKED : this.isUnreadNotifications() ? SCREEN_STATES.ALERT : SCREEN_STATES.HOMESCREEN,
    });
  }

  handleSelectClick() {
    if (this.state.screenState === SCREEN_STATES.LOCKED) { return; }
    if (this.state.screenState === SCREEN_STATES.ALERT) {
    const selectedAlertItem = this.state.alertItems[this.state.alertSelectedItem];
      switch(selectedAlertItem) {
        case 'View':
          this.viewAlert();
          break;
        default:
          this.cancelAlert();
      }
    }
  }

  handleEndCallClick() {
    if (this.state.screenState === SCREEN_STATES.LOCKED) { return; }
    this.setState({
      screenState: this.isUnreadNotifications() ? SCREEN_STATES.ALERT : SCREEN_STATES.HOMESCREEN,
    });
  }

  handleCallClick() {
    if (this.state.screenState === SCREEN_STATES.LOCKED) { return; }
    if (this.state.screenState !== SCREEN_STATES.HOMESCREEN) { return; }
    this.goToMissedCalls();
  }

  viewAlert() {
    if (this.getAlertType() === 'messages') {
      this.goToMessages();
    } else if (this.getAlertType() === 'missed calls') {
      this.goToMissedCalls();
    }
  }

  cancelAlert() {
    let missedCalls = this.state.missedCalls;
    let messages = this.state.messages;
    let currentUnreadMessages = this.hasUnreadMessages();
    let currentUnreadMissedCalls = this.hasUnreadMissedCalls();
    if (this.getAlertType() === 'messages') {
      messages = this.state.messages.map(message => ({...message, hasShownAlert: true}));
      currentUnreadMessages = false;
    } else if (this.getAlertType() === 'missed calls') {
      missedCalls = this.state.missedCalls.map(missedCall => ({...missedCall, hasShownAlert: true}));
      currentUnreadMissedCalls = false;
    }
    this.setState({
      alertSelectedItem: 0,
      missedCalls,
      messages,
      screenState: (currentUnreadMessages || currentUnreadMissedCalls) ? SCREEN_STATES.ALERT : SCREEN_STATES.HOMESCREEN,
    });
  }

  isUnreadNotifications() {
    return this.hasUnreadMessages() || this.hasUnreadMissedCalls();
  }

  unreadMessageNotifications() {
    return this.state.messages.filter(notification => !notification.hasShownAlert);
  }

  unreadMissedCallNotifications() {
    return this.state.missedCalls.filter(notification => !notification.hasShownAlert);
  }

  hasUnreadMessages() {
   return this.unreadMessageNotifications().length > 0;
  }

  hasUnreadMissedCalls() {
   return this.unreadMissedCallNotifications().length > 0;
  }

  getAlertType() {
    return this.hasUnreadMessages() ? 'messages' : this.hasUnreadMissedCalls() ? 'missed calls' : null;
  }

  getAlertTitle() {
    return this.unreadMessageNotifications().length > 0 ?
      `New message${this.unreadMessageNotifications().length > 1 ? 's' : ''}` :
      this.unreadMissedCallNotifications().length > 0 ?
      `Missed call${this.unreadMissedCallNotifications().length > 1 ? 's' : ''}` :
      '';
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

  getScreen() {
    const alert = <Alert title={this.getAlertTitle()} items={this.state.alertItems} selectedItem={this.state.alertSelectedItem} />;
    const menu = <Menu title={this.state.menuTitle} items={this.state.menuItems} />;
    const homescreen = <Homescreen date={this.state.date} isMilitaryTime={this.state.settings.isMilitaryTime} messageNotifications={this.state.messages} missedCallNotifications={this.state.missedCalls} signalStrength={this.state.signalStrength} />;

    switch(this.state.screenState) {
      case SCREEN_STATES.ALERT:
        return alert;
      case SCREEN_STATES.MENU:
        return menu;
      default:
        return homescreen;
    }
  }

  render() {
    const showStatusBar = this.state.screenState === SCREEN_STATES.HOMESCREEN ||
      this.state.screenState === SCREEN_STATES.LOCKED;
    const statusbar = showStatusBar ?
        <Statusbar
          isLocked={this.state.screenState === SCREEN_STATES.LOCKED}
          volumeLevel={this.state.volumeLevel}
          batteryLevel={this.state.batteryLevel}
          isBluetoothOn={this.state.isBluetoothOn}
          carrier={this.state.info.carrier}
        /> :
      null;

    return (
        <div className="Phone">
          <div className="Phone__screen">
            {statusbar}
            {this.getScreen()}
          </div>
          <Buttons
            onUpClick={this.handleUpClick}
            onDownClick={this.handleDownClick}
            onSelectClick={this.handleSelectClick}
            onEndCallClick={this.handleEndCallClick}
            onCallClick={this.handleCallClick}
          />
        </div>
    );
  }
}

export default Phone;
