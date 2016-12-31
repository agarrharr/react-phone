import React from 'react';
import './Homescreen.css';
import {FormattedDate, FormattedTime} from 'react-intl';

const Homescreen = ({
  date,
  isMilitaryTime,
  messageNotifications,
  missedCallNotifications,
  signalStrength,
}) => {
  const messageNotificationMessage = getMessageNotificationMessage(messageNotifications);
  const missedCallNotificationMessage = getMissedCallNotificationMessage(missedCallNotifications);

  function getMessageNotificationMessage(notifications) {
    if (notifications.length === 1) {
      return `New message: ${notifications[0].message}`;
    } else if (notifications.length > 1) {
      return `${notifications.length} new messages`;
    } else {
      return null;
    }
  }

  function getMissedCallNotificationMessage(notifications) {
    if (notifications.length === 1) {
      return `Missed call: ${notifications[0].message}`;
    } else if (notifications.length > 1) {
      return `${notifications.length} missed calls`;
    } else {
      return null;
    }
  }

  return (
    <div className="Home">
      <div className="Home__NoService">
        {signalStrength === 0 ? 'NO SERVICE': null}
      </div>
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
          <div className="Home__Weekday">
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
      <div>{messageNotificationMessage}</div>
      <div>{missedCallNotificationMessage}</div>
      </div>
    </div>
  );
};

export default Homescreen;
