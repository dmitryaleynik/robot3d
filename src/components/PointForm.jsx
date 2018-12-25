import React from 'react';
import PropTypes from 'prop-types';

class PointForm extends React.Component {
  state = {
    x: '',
    y: '',
    z: '',
  };
  
  setX = event => this.setState({x: event.target.value});
  setY = event => this.setState({y: event.target.value});
  setZ = event => this.setState({z: event.target.value});

  submitForm = (event) => {
    event.preventDefault();
    const { x, y, z } = this.state;
    const { handleSubmit } = this.props;
    handleSubmit({ x, y, z })
  }

  render () {
    return (
      <div className="point-form">
        <form className="point-form__form">
          <input type="text" placeholder="x" className="point-form__input" onChange={this.setX} />
          <input type="text" placeholder="y" className="point-form__input" onChange={this.setY} />
          <input type="text" placeholder="z" className="point-form__input" onChange={this.setZ} />
          <button className="point-form__button" onClick={this.submitForm}>Submit</button>
        </form>
      </div>
    );
  }
} 

PointForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
}

export default PointForm;