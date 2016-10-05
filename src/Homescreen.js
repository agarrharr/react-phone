import React from 'react';
import './Homescreen.css';
import {FormattedDate, FormattedTime} from 'react-intl';

const Homescreen = ({date, isMilitaryTime, messageNotifications, missedCallNotifications}) => {
  let messageNotificationMessage = `New message: ${messageNotifications[0].message}`;
  let missedCallNotificationMessage = ``;

  return (
    <div className="Home">
      <div className="Home__datetime">
        <div className="Home__datetime__time">
          <FormattedTime
            value={date}
            hour='numeric'
            minute='numeric'
            hour12={!isMilitaryTime}
          />
        </div>
        <div className="Home__datetime__date">
          <div className="Home__datetime__date__weekday">
            <FormattedDate
              value={date}
              weekday='short'
            />
          </div>
          <div className="Home__datetime__date__dayMonth">
            <FormattedDate
              value={date}
              day='2-digit'
            />
            <FormattedDate
              value={date}
              month='short'
            />
          </div>
        </div>
      </div>
      <div className="Home__notifications">
      {messageNotificationMessage}
      {missedCallNotificationMessage}
      </div>
    </div>
  );
};

export default Homescreen;
