import React from 'react';
import cx from 'classnames';
import './Alert.css';

const Alert = ({
  title,
  items,
  selectedItem
}) => {
  const menuItems = items.map((item, key) =>
      <div className={cx({
        'Alert__item': true,
        'Alert__item--selected': key === selectedItem
      })} key={key}>
        {item}
      </div>
  );

  return (
    <div className="Alert">
      <div className="Alert__title">
        {title}
      </div>
      <div className="Alert__items">
        {menuItems}
      </div>
    </div>
  );
};

Alert.propTypes = {
  title: React.PropTypes.string.isRequired,
  items: React.PropTypes.array.isRequired,
  selectedItem: React.PropTypes.number.isRequired
};

export default Alert;
