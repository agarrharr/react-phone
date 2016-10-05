import React from 'react';
import './Buttons.css';

const Buttons = ({onUpClick, onDownClick}) => {
    return (
        <div className="Buttons">
          <div onClick={onUpClick}>Up</div>
          <div>Select</div>
          <div onClick={onDownClick}>Down</div>
        </div>
    );
}

Buttons.propTypes = {
    onUpClick: React.PropTypes.func.isRequired,
    onDownClick: React.PropTypes.func.isRequired
};

export default Buttons;
