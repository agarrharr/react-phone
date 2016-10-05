import React, { Component } from 'react';
import Menu from './Menu';
import './App.css';

class App extends Component {
  render() {
    const options = [{name: 'View', default: true}, {name: 'Cancel'}];
    return (
      <div className="App">
        <div className="App__phone">
          <Menu title="New message" options={options} />
        </div>
      </div>
    );
  }
}

export default App;
