import React, {Component} from 'react';
import Homescreen from './Homescreen';
import Statusbar from './Statusbar';

class Home extends Component {
  state = {
    date: new Date(),
    settings: {isMilitaryTime: true},
    messages: [
      {message: 'Douglas Adams Mobile', viewed: false, hasShownAlert: false},
      {message: 'Steve Wozniak Mobile', viewed: false, hasShownAlert: false},
    ],
    missedCalls: [{message: 'Douglas Adams Mobile', hasShownAlert: false}],
  };

  render() {
    const statusbar = (
      <Statusbar
        isLocked={this.props.isLocked}
        volumeLevel={this.props.volumeLevel}
        batteryLevel={this.props.batteryLevel}
        isBluetoothOn={this.props.isBluetoothOn}
        carrier={this.props.carrier}
      />
    );

    return (
      <div>
        {statusbar}
        <Homescreen
          date={this.state.date}
          isMilitaryTime={this.state.settings.isMilitaryTime}
          messageNotifications={this.state.messages}
          missedCallNotifications={this.state.missedCalls}
          signalStrength={this.props.signalStrength}
        />
      </div>
    );
  }
}

export default Home;

