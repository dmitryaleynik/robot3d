import React from 'react';
import PropTypes from 'prop-types';

class PointForm extends React.Component {
  render () {
    return (
      <div className="point-form">
        <form className="point-form__form">
          <input type="text" placeholder="x" className="point-form__input" />
          <input type="text" placeholder="y" className="point-form__input" />
          <input type="text" placeholder="z" className="point-form__input" />
          <button type="submit" className="point-form__button">Submit</button>
        </form>
      </div>
    );
  }
} 

export default PointForm;