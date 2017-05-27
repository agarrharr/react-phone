import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import App from './App.js';
import Messages from './Messages.js';
import Home from './Home.js';

const Homescreen = () => (
  <div>
    <App>
      <Home />
    </App>
  </div>
);

const MessagesScreen = () => (
  <div>
    <App>
      <Messages />
    </App>
  </div>
);

const BasicExample = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Homescreen</Link></li>
        <li><Link to="/messages">Messages</Link></li>
      </ul>
      <hr />
      <Route exact path="/" component={Homescreen} />
      <Route exact path="/messages" component={MessagesScreen} />
    </div>
  </Router>
);
export default BasicExample;

