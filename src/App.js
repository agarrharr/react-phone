import React, { Component } from 'react';
import Phone from './Phone';
import './App.css';
import {IntlProvider} from 'react-intl';

class App extends Component {
  constructor() {
    super(...arguments);

    this.handleLockClick = this.handleLockClick.bind(this);
  }

  handleLockClick() {
    this.phone.handleLockClick();
  }

  render() {
    return (
      <IntlProvider locale="en">
        <div className="App">
          <div className="App__Button App__Button--Lock" onClick={this.handleLockClick }></div>
          <Phone ref={(ref) => this.phone = ref } />
        </div>
      </IntlProvider>
    );
  }
}

export default App;
