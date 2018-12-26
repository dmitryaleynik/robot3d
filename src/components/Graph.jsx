import React from 'react';
import Plot from 'react-plotly.js';
import map from 'lodash/map';
import get from 'lodash/get';
import continents from './continents.json';
import PointForm from './PointForm';
import getColor from '../helpers/getColor';

class Graph extends React.Component {
  constructor (props) {
    super(props);

    const data = this.formData(continents);
    const fileReader = new FileReader();

    this.state = {
      data: [data],
      isVisiblePointForm: false,
      selectedPointIndex: -1,
      fileReader,
    };
  }

  formData = (countries) => {
    return {
      x: map(countries, country => country.x),
      y: map(countries, country => country.y),
      z: map(countries, country => country.z),
      size: map(countries, country => country.marker.size),
      text: map(countries, (country, countryName) => `${countryName}`),
      type: 'scatter3d',
      mode: 'markers',
      marker: {
        color: map(countries, country => getColor(country.continent)),
        size: map(countries, country => country.marker.size),
      },
    };
  };

  handleClick = (event) => {
    const pointIndex = get(event, 'points[0].pointNumber', null);
    const { isVisiblePointForm, selectedPointIndex } = this.state
    if (!isVisiblePointForm) {
      this.setState({
        isVisiblePointForm: true,
      });
    }

    if (pointIndex !== selectedPointIndex) {
      this.setState({
        selectedPointIndex: pointIndex,
      })
    }
  };

  handleChange = (selectorFiles) => {
    const pointsFile = selectorFiles[0];

    this.state.fileReader.onloadend = (event) => {
      const points = JSON.parse(this.state.fileReader.result);
      const data = this.formData(points);
      this.setState({ data: [data] });
    }

    this.state.fileReader.readAsText(pointsFile);
  };

  getUpdatePointArray(points, updatedPoint) {
    const { selectedPointIndex } = this.state;
    return points.map((point, index) => {
      if (index === selectedPointIndex) {
        return updatedPoint;
      }
      return point;
    });
  }

  handleSubmit = (submitedData) => {
    const {
      selectedPointIndex,
      data,
    } = this.state;

    const { 
      x: xPoints,
      y: yPoints,
      z: zPoints,
    } = data[0];

    if (selectedPointIndex !== -1) {
      const newData = {
        ...data[0],
        x: this.getUpdatePointArray(xPoints, submitedData.x),
        y: this.getUpdatePointArray(yPoints, submitedData.y),
        z: this.getUpdatePointArray(zPoints, submitedData.z),
      }
       this.setState({
        data: [newData],
        selectedPointIndex: -1,
        isVisiblePointForm: false,
      }); 
    }
  }

  render() {
    const { data, isVisiblePointForm } = this.state;
    return (
      <div className="graph-page">
        <div className="graph-page__graph-container"> 
          <Plot
            data={data}
            layout={ {width: 1000, height: 800, title: 'World Countries Statistics'} }
            onClick={this.handleClick}
          />
        </div>
        <input
          type="file"
          accept="application/json"
          onChange={ (e) => this.handleChange(e.target.files) }
        />
        {isVisiblePointForm && <PointForm handleSubmit={this.handleSubmit}/>}
      </div>
    )
  }
};

export default Graph;
