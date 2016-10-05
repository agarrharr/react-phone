import React from 'react';
import './Homescreen.css';
import {FormattedDate, FormattedTime} from 'react-intl';

const Homescreen = ({date, isMilitaryTime, messageNotifications, missedCallNotifications}) => {
  let messageNotificationMessage = `New message: ${messageNotifications[0].message}`;
  let missedCallNotificationMessage = ``;

  return (
    <div className="Home">
      <div className="Home__Datetime">
        <div className="Home__Time">
          <FormattedTime
            value={date}
            hour='numeric'
            minute='numeric'
            hour12={!isMilitaryTime}
          />
        </div>
        <div className="Home__Date">
          <div className="Home__datetime__date__weekday">
            <FormattedDate
              value={date}
              weekday='short'
            />
          </div>
          <div>
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
      <div className="Home__Notifications">
      {messageNotificationMessage}
      {missedCallNotificationMessage}
      </div>
    </div>
  );
};

export default Homescreen;
