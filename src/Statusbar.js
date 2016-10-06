import React from 'react';
import './Statusbar.css';

const Statusbar = ({isLocked, volumeLevel, batteryLevel, isBluetoothOn, carrier }) => {
  const bluetooth = isBluetoothOn ? <div className="Statusbar__Icon Statusbar__Icon--bluetooth"></div> : null;
  const lock = isLocked ? <div className="Statusbar__Icon Statusbar__Icon--lock"></div>: null;
  const volume = volumeLevel === 0 ? <div className="Statusbar__Icon Statusbar__Icon--vibrate"></div> : null;
  const battery = <div className="Statusbar__Icon Statusbar__Icon--battery"></div>;

  return (
    <div className="Statusbar">
      <div className="Statusbar__Left">
        <div className="Statusbar__Icon Statusbar__Icon--signal"></div>
        <div className="Statusbar__Carrier">{carrier}</div>
      </div>
      <div className="Statusbar__Right">
        {bluetooth}
        {lock}
        {volume}
        {battery}
      </div>
    </div>
  );
};

export default Statusbar;
