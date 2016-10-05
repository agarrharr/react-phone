import React from 'react';
import './Homescreen.css';

const Homescreen = ({date}) => {
  const time = date.getHours() + ':' + date.getMinutes();

  return (
    <div className="Home">
      <div className="Home__datetime">
        <div className="Home__datetime__time">
          {time}
        </div>
      </div>
    </div>
  );
};

export default Homescreen;
