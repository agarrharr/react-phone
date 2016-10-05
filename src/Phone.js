import React from 'react';
import Menu from './Menu';
import './Phone.css';

const Phone = () => {
  const options = [{name: 'View', default: true}, {name: 'Cancel', default: false}];

  return (
      <div className="Phone">
        <Menu title="New message" options={options} />
      </div>
  );
}

export default Phone;
