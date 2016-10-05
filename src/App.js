import React, { Component } from 'react';
import Phone from './Phone';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Phone/>
        <div onClick={this.buttonPress.bind(this)('up')}>Up</div>
        <div onClick={this.buttonPress.bind(this)('select')}>Select</div>
        <div onClick={this.buttonPress.bind(this)('down')}>Down</div>
      </div>
    );
  }

  buttonPress(key) {
    return () => {
      console.log(key);
    }
  }
}

export default App;
