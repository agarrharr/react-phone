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
          <div className="Buttons__Button" onClick={onUpClick}>Up</div>
          <div className="Buttons__Button" onClick={onSelectClick}>Select</div>
          <div className="Buttons__Button" onClick={onDownClick}>Down</div>
          <div className="Buttons__Button" onClick={onCallClick}>Call</div>
          <div className="Buttons__Button" onClick={onEndCallClick}>End</div>
        </div>
    );
}

Buttons.propTypes = {
    onUpClick: React.PropTypes.func.isRequired,
    onDownClick: React.PropTypes.func.isRequired
};

export default Buttons;
