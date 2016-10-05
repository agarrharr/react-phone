import React from 'react';
import cx from 'classnames';
import './Menu.css';

const Menu = ({
  title,
  options
}) => {
  const menuOptions = options.map(item =>
      <div className={cx({
        'Menu__item': true,
        'Menu__item--default': item.default
      })}>
        {item.name}
      </div>
  );

  return (
    <div className="Menu">
      <div className="Menu__title">
        {title}
      </div>
      <div className="Menu__items">
        {menuOptions}
      </div>
    </div>
  );
};

export default Menu;
