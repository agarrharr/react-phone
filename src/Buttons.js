import React from 'react';
import './Buttons.css';

const Buttons = ({
        onUpClick,
        onDownClick,
        onLockClick,
        onSelectClick,
        onEndCallClick
    }) => {
    return (
        <div className="Buttons">
          <div className="Buttons__button" onClick={onLockClick}>Unlock</div>
          <div className="Buttons__button" onClick={onUpClick}>Up</div>
          <div className="Buttons__button" onClick={onSelectClick}>Select</div>
          <div className="Buttons__button" onClick={onDownClick}>Down</div>
          <div className="Buttons__button" onClick={onEndCallClick}>End call</div>
        </div>
    );
}

Buttons.propTypes = {
    onUpClick: React.PropTypes.func.isRequired,
    onDownClick: React.PropTypes.func.isRequired
};

export default Buttons;
