import React from 'react';
import PropTypes from 'prop-types';

const PointForm = (props) => {
  return (
    <div class="point-form">
      <form class="point-form__form">
        <input type="text" placeholder="x" className="point-form__input" />
        <input type="text" placeholder="y" className="point-form__input" />
        <input type="text" placeholder="z" className="point-form__input" />
        <button type="submit" className="point-form__button">Submit</button>
      </form>
    </div>
  );
};

export default PointForm;