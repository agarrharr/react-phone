import React, {Component} from 'react';
import Menu from './Menu';

class Messages extends Component {
  state = {menuTitle: '', menuItems: [{left: 'hi', right: '12:03'}]};

  render() {
    return <Menu title={this.state.menuTitle} items={this.state.menuItems} />;
  }
}

export default Messages;

