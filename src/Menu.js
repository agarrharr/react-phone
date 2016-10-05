import React from 'react';
import cx from 'classnames';
import './Menu.css';

const Menu = ({
  title,
  items,
  selectedItem
}) => {
  const menuItems = items.map((item, key) =>
      <div className={cx({
        'Menu__item': true,
        'Menu__item--selected': key === selectedItem
      })} key={key}>
        {item}
      </div>
  );

  return (
    <div className="Menu">
      <div className="Menu__title">
        {title}
      </div>
      <div className="Menu__items">
        {menuItems}
      </div>
    </div>
  );
};

Menu.propTypes = {
  title: React.PropTypes.string.isRequired,
  items: React.PropTypes.array.isRequired,
  selectedItem: React.PropTypes.number.isRequired
};

export default Menu;
