import React from 'react';
import PropTypes from 'prop-types';
import '../styles/index.scss';

class PointForm extends React.Component {
  state = {
    x: '',
    y: '',
    z: '',
    size: '',
    nuclearWeapon: '',
  };
  
  setX = event => this.setState({x: event.target.value});
  setY = event => this.setState({y: event.target.value});
  setZ = event => this.setState({z: event.target.value});
  setSize = event => this.setState({size: event.target.value});
  setNuclearWeapon = event => this.setState({nuclearWeapon: event.target.value});

  submitForm = (event) => {
    event.preventDefault();
    const { x, y, z, size, nuclearWeapon } = this.state;
    const { handleSubmit } = this.props;
    handleSubmit({ x, y, z, size, nuclearWeapon })
  }

  render () {
    return (
      <div className="point-form">
        <form className="point-form__form">
          <input type="text" placeholder="Population, million (x)" className="point-form__input" onChange={this.setX} />
          <input type="text" placeholder="HDI (y)" className="point-form__input" onChange={this.setY} />
          <input type="text" placeholder="GDP, million $ (z)" className="point-form__input" onChange={this.setZ} />
          <input type="text" placeholder="Area, thousand sq km" className="point-form__input" onChange={this.setSize} />
          <select className="point-form__input" onChange={this.setNuclearWeapon}>
            <option disabled selected value> Nuclear weapon </option>
            <option value={true}>true</option>
            <option value={false}>false</option>
          </select>
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