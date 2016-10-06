import React from 'react';
import './Buttons.css';

const Buttons = ({
        onUpClick,
        onDownClick,
        onUnlockClick,
        onSelectClick
    }) => {
    return (
        <div className="Buttons">
          <div className="Buttons__button" onClick={onUnlockClick}>Unlock</div>
          <div className="Buttons__button" onClick={onUpClick}>Up</div>
          <div className="Buttons__button" onClick={onSelectClick}>Select</div>
          <div className="Buttons__button" onClick={onDownClick}>Down</div>
        </div>
    );
}

Buttons.propTypes = {
    onUpClick: React.PropTypes.func.isRequired,
    onDownClick: React.PropTypes.func.isRequired
};

export default Buttons;
