import React from 'react';
import './Buttons.css';

const Buttons = ({
        onUpClick,
        onDownClick,
        onLockClick,
        onSelectClick,
        onCallClick,
        onEndCallClick
    }) => {
    return (
        <div className="Buttons">
          <div className="Buttons__button Buttons--lock" onClick={onLockClick}></div>
          <div className="Buttons__button" onClick={onUpClick}>Up</div>
          <div className="Buttons__button" onClick={onSelectClick}>Select</div>
          <div className="Buttons__button" onClick={onDownClick}>Down</div>
          <div className="Buttons__button" onClick={onCallClick}>Call</div>
          <div className="Buttons__button" onClick={onEndCallClick}>End</div>
        </div>
    );
}

Buttons.propTypes = {
    onUpClick: React.PropTypes.func.isRequired,
    onDownClick: React.PropTypes.func.isRequired
};

export default Buttons;
