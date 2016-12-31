import React from 'react';
import './Buttons.css';

const Buttons = ({
  onUpClick,
  onDownClick,
  onLockClick,
  onSelectClick,
  onEndCallClick,
  onCallClick,
  onMessagesClick,
}) => {
return (
    <div className="Buttons">
      <div className="Buttons__Row Buttons__Row--Offset">
        <div className="Buttons__Button" onClick={onUpClick}>Up</div>
        <div className="Buttons__Button" onClick={onSelectClick}>Select</div>
        <div className="Buttons__Button" onClick={onDownClick}>Down</div>
        <div className="Buttons__Button">Contacts</div>
        <div className="Buttons__Button" onClick={onMessagesClick}>Messages</div>
      </div>
      <div className="Buttons__Row">
        <div className="Buttons__Button" onClick={onCallClick}>Call</div>
        <div className="Buttons__Button">1</div>
        <div className="Buttons__Button">4</div>
        <div className="Buttons__Button">7</div>
        <div className="Buttons__Button">*</div>
      </div>
      <div className="Buttons__Row">
        <div className="Buttons__Button">&lt;</div>
        <div className="Buttons__Button">2</div>
        <div className="Buttons__Button">5</div>
        <div className="Buttons__Button">8</div>
        <div className="Buttons__Button">0</div>
      </div>
      <div className="Buttons__Row">
        <div className="Buttons__Button" onClick={onEndCallClick}>End</div>
        <div className="Buttons__Button">3</div>
        <div className="Buttons__Button">6</div>
        <div className="Buttons__Button">9</div>
        <div className="Buttons__Button">#</div>
      </div>
      <div className="clearfix"></div>
    </div>
);
}

Buttons.propTypes = {
  onUpClick: React.PropTypes.func.isRequired,
  onDownClick: React.PropTypes.func.isRequired,
  onSelectClick: React.PropTypes.func.isRequired,
  onEndCallClick: React.PropTypes.func.isRequired,
  onCallClick: React.PropTypes.func.isRequired,
  onMessagesClick: React.PropTypes.func.isRequired,
};

export default Buttons;
