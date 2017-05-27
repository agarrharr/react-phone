import React from 'react';
import {Link} from 'react-router-dom';
import './Buttons.css';

const Buttons = () => (
  <div className="Buttons">
    <div className="Buttons__Row Buttons__Row--Offset">
      <div className="Buttons__Button">Up</div>
      <div className="Buttons__Button">Select</div>
      <div className="Buttons__Button">Down</div>
      <div className="Buttons__Button">Contacts</div>
      <div className="Buttons__Button">
        <Link to="/messages">
          Messages
        </Link>
      </div>
    </div>
    <div className="Buttons__Row">
      <div className="Buttons__Button">Call</div>
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
      <div className="Buttons__Button">End</div>
      <div className="Buttons__Button">3</div>
      <div className="Buttons__Button">6</div>
      <div className="Buttons__Button">9</div>
      <div className="Buttons__Button">#</div>
    </div>
    <div className="clearfix" />
  </div>
);

export default Buttons;

