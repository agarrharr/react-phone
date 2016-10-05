import React from 'react';
import './Homescreen.css';
import {FormattedDate, FormattedTime} from 'react-intl';

const Homescreen = ({date, isMilitaryTime}) => {
  return (
    <div className="Home">
      <div className="Home__datetime">
        <div className="Home__datetime__time">
          <div className="Home_datetime__date_weekday">
            <FormattedTime
              value={date}
              hour='numeric'
              minute='numeric'
              hour12={!isMilitaryTime}
            />
          </div>
        </div>
        <div className="Home__datetime__date">
          <div className="Home_datetime__date_weekday">
            <FormattedDate
              value={date}
              weekday='short'
            />
          </div>
          <div className="Home_datetime__date_day">
            <FormattedDate
              value={date}
              day='2-digit'
            />
          </div>
          <div className="Home_datetime__date_month">
            <FormattedDate
              value={date}
              month='short'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homescreen;
