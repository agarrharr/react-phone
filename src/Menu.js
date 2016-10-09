import React from 'react';
import './Menu.css';

const Menu = ({
  title,
  items
}) => {
  return (
    <div className="Menu">
      <div className="Menu__Title">
        {title}
      </div>
      {items.map((item, i) =>
          <div className="Menu__Item" key={i}>
            <div className="Menu__Item--left">{item.left}</div>
            <div className="Menu__Item--right">{item.right}</div>
          </div>
      )}
    </div>
  );
};

Menu.propTypes = {
  title: React.PropTypes.string.isRequired,
  items: React.PropTypes.array.isRequired
};

export default Menu;
