import React, { Component } from 'react';
import Phone from './Phone';
import './App.css';
import {IntlProvider} from 'react-intl';

class App extends Component {
  render() {
    return (
      <IntlProvider locale="en">
        <div className="App">
          <Phone/>
        </div>
      </IntlProvider>
    );
  }
}

export default App;
