import React from 'react';
import Plot from 'react-plotly.js';
import FileSaver from 'file-saver';
import map from 'lodash/map';
import get from 'lodash/get';
import set from 'lodash/set';
import initialCountries from './initialCountries.json';
import PointForm from './PointForm';
import getColor from '../helpers/getColor';

class Graph extends React.Component {
  constructor (props) {
    super(props);

    const countries = initialCountries;
    const fileReader = new FileReader();

    this.state = {
      countries,
      isVisiblePointForm: false,
      selectedPointText: null,
      fileReader,
    };
  };

  formData = (countries) => {
    return [{
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
    }];
  };

  handleClick = (event) => {
    console.log('event', event);
    const pointText = get(event, 'points[0].text', null);
    const { isVisiblePointForm, selectedPointText } = this.state;
    if (!isVisiblePointForm) {
      this.setState({
        isVisiblePointForm: true,
      });
    }

    if (pointText !== selectedPointText) {
      this.setState({
        selectedPointText: pointText,
      })
    }
  };

  handleChange = (selectorFiles) => {
    const pointsFile = selectorFiles[0];

    this.state.fileReader.onloadend = () => {
      const points = JSON.parse(this.state.fileReader.result);
      this.setState({ countries: points });
    }

    this.state.fileReader.readAsText(pointsFile);
  };

  handleSubmit = (submitedData) => {
    const {
      selectedPointText,
      countries,
    } = this.state;

    const { x, y, z } = submitedData;

    if (selectedPointText !== null) {
      const newCountry = {
        ...get(countries, selectedPointText, {}),
        x, y, z
      };

      set(countries, selectedPointText, newCountry);

      this.setState({
        countries,
        selectedPointText: null,
        isVisiblePointForm: false,
      }); 
    }
  };

  download = () => {
    var blob = new Blob([JSON.stringify(this.state.countries)], {type: "application/json;charset=utf-8"});
    FileSaver.saveAs(blob, "countries.json");
  };

  render() {
    const { countries, isVisiblePointForm } = this.state;
    const data = this.formData(countries);
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
        <div onClick={this.download}>download</div>
      </div>
    )
  }
};

export default Graph;
