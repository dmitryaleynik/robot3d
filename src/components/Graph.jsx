import React from 'react';
import Plot from 'react-plotly.js';
import FileSaver from 'file-saver';
import map from 'lodash/map';
import get from 'lodash/get';
import set from 'lodash/set';
import PointForm from './PointForm';
import initialCountries from '../data/initialCountries.json';
import getColor from '../helpers/getColor';
import '../styles/index.scss';

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

// <<<<<<< Updated upstream
  getUniqueCriterias(countries, groupCriteria) {
    if (groupCriteria === undefined) {
      return;
    }
    const criterias = {};

    map(countries, country => {
      const valueCriteria = country[groupCriteria];
      criterias[valueCriteria] = 1;
    });
   
    return Object.keys(criterias);
  }

  formData = (countries, groupCriteria = 'continent') => {
    const groupCriterias = this.getUniqueCriterias(countries, groupCriteria);
    let groupedByCriteria = {};
    groupCriterias.forEach(criteriaValue => {
      groupedByCriteria[criteriaValue] = Object.keys(countries).map(country => {
        if (countries[country][groupCriteria] === criteriaValue) {
          return {
            ...countries[country],
            name: country
          }
        }
      });
    });

    const filteredGroupedByCriteria = {};

    groupedByCriteria = map(groupedByCriteria, (criteria, continentName) => {
      filteredGroupedByCriteria[continentName] = criteria.filter(country => country);
      return undefined;
    });

    const data = map(filteredGroupedByCriteria, (countryByCriteria, continentName) => {
      const x = countryByCriteria.map(country => country.x);
      const y = countryByCriteria.map(country => country.y);
      const z = countryByCriteria.map(country => country.z);

      const color = countryByCriteria.map(country => getColor(country.continent));

      const size = countryByCriteria.map(country => country.marker.size);
      const text = countryByCriteria.map(country => country.name);

      return {
        x,
        y,
        z,
        type: 'scatter3d',
        mode: 'markers',
        text,
        name: continentName,
        marker: { color, size },
        hoverinfo: 'text',
        hovertext: map(countries, (country, countryName) => {
          return `<b>${countryName}</b><br><br>Population: ${country.x}<br>HDI: ${country.y}<br>GDP: $${country.z} million<br>Area: ${country.marker.size} km^2`;
        }),
      };

    }); 
    return data;
// =======
//   formData = (countries) => {
//     return [{
//       x: map(countries, country => country.x),
//       y: map(countries, country => country.y),
//       z: map(countries, country => country.z),
//       size: map(countries, country => country.marker.size),
//       text: map(countries, (country, countryName) => `${countryName}`),
//       type: 'scatter3d',
//       mode: 'markers',
//       marker: {
//         color: map(countries, country => getColor(country.continent)),
//         size: map(countries, country => country.marker.size),
//         opacity: map(countries, country => country.marker.opacity),
//       },
//       hoverinfo: 'text',
//       hovertext: map(countries, (country, countryName) => {
//         return `<b>${countryName}</b><br><br>Population: ${country.x}<br>HDI: ${country.y}<br>GDP: $${country.z} million<br>Area: ${country.marker.size} km^2`;
//       }),
//     }];
// >>>>>>> Stashed changes
  };

  formLayout = () => {
    return {
      width: 1200,
      height: 600,
      title: 'World Countries Statistics 3D',
      scene: {
        xaxis: {
          title: 'Population (x)',
        },
        yaxis: {
          title: 'HDI (y)', // Human Development Index - Индек5с человеческого развития (ИЧР)
        },
        zaxis: {
          title: 'GDP (z)', // Gross Domestic Product - Внутренний валовый продукт (ВВП)
        },
      },
    };
  };

  handleClick = (event) => {
    console.log(event);
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
    var blob = new Blob([JSON.stringify(this.state.countries,null, 2)], {type: "application/json;charset=utf-8"});
    FileSaver.saveAs(blob, "countries.json");
  };

  render() {
    const { countries, isVisiblePointForm } = this.state;
    const data = this.formData(countries);
    const layout = this.formLayout();
    return (
      <div className="graph-page">
        <div className="graph-page__graph-container">
          <div className="graph-page__buttons-container">
            <input
              type="file"
              accept="application/json"
              onChange={ (e) => this.handleChange(e.target.files) }
            />
             <label className="input-file-label"> Select .json file with countries data
              <input
                className="input-file"
                type="file"
                accept="application/json"
                onChange={ (e) => this.handleChange(e.target.files) }
              />
            </label> 
            <input
              type="button"
              className="button-download"
              value="Download .json file with countries data"
              onClick={this.download}
            />
          </div>
          <Plot
            data={data}
            layout={layout}
            onClick={this.handleClick}
          />
        </div>
        {isVisiblePointForm && <PointForm handleSubmit={this.handleSubmit}/>}
      </div>
    )
  }
};

export default Graph;
