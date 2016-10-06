import React from 'react';
import './Menu.css';

const Menu = ({
  title,
  items
}) => {
  return (
    <div className="Menu">
      {title}
      {items.map(item => <div>item</div>)}
    </div>
  );
};

Menu.propTypes = {
  title: React.PropTypes.string.isRequired,
  items: React.PropTypes.array.isRequired
};

export default Menu;
