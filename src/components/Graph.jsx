import React from 'react';
import Plot from 'react-plotly.js';
import _ from 'lodash';
import continents from './points';
import PointForm from './PointForm';

class Graph extends React.Component {
  constructor (props) {
    super(props);

    const data = _.map(continents, (continent, continentName) => {
      const x = _.map(continent.countries, country => country.x);
      const y = _.map(continent.countries, country => country.y);
      const z = _.map(continent.countries, country => country.z);
      const color = continent.color;
      const opacity =  _.map(continent.countries, country => country.marker.opacity);
      const size = _.map(continent.countries, country => country.marker.size);
      const text = _.map(continent.countries, (country, countryName) => `${countryName}`);

      return {
        x,
        y,
        z,
        type: 'scatter3d',
        mode: 'markers',
        text,
        name: continentName,
        marker: { color, size, opacity },
      };
    })

    this.state = { data, isVisiblePointForm: false };
  }

  handleClick = (event) => {
    debugger;
    const { isVisiblePointForm } = this.state
    if (!isVisiblePointForm) {
      this.setState({
        isVisiblePointForm: true,
      });
    }
  };
  
  render() {
    const { data, isVisiblePointForm } = this.state;
    return (
      <div className="graph-page">
        <div className="graph-page__graph-container"> 
          <Plot
            data={data}
            layout={ {width: 1000, height: 800, title: 'A Fancy Plot'} }
            onClick={this.handleClick}
          />
        </div>
        {isVisiblePointForm && <PointForm />}
      </div>
    )
  }
};

export default Graph;


/* 

Plotly.d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/3d-scatter.csv', function(err, rows){
function unpack(rows, key) {
	return rows.map(function(row)
	{ return row[key]; });}

var trace1 = {
	x:unpack(rows, 'x1'), y: unpack(rows, 'y1'), z: unpack(rows, 'z1'),
	mode: 'markers',
	marker: {
		size: 8,
		line: {
		color: 'rgba(217, 217, 217, 0.14)',
		width: 0.5},
		opacity: 0.8},
	type: 'scatter3d'
};
debugger;
let dots = Array(100).fill(null);
console.log(dots);


xx = [1,2,3,4,5,6,7,8];
yy = [1,2,3,4,5,6,7,8];
zz = [1,2,3,4,5,6,7,8];

var trace2 = {
	x:xx, y: yy, z: zz,
	mode: 'markers',
	marker: {
		color: ['black', 'red','red','red','black','red'],
		size: [10,11,12,13,14,15,16,17,18,19],
		symbol: 'circle',
		line: {
		color: 'rgb(204, 204, 204)',
		width: 1},
		opacity: 0.8},
  type: 'scatter3d'};
  
  trace1.x = trace1.x.slice(1,10);
  trace1.y = trace1.y.slice(1,10);
  trace1.z = trace1.z.slice(1,10);

var data = [trace1, trace2];
var layout = {
  scene:{
	 aspectmode: "manual",
   aspectratio: {
     x: 1, y: 0.7, z: 1,
    },
   xaxis: {
    nticks: 1,
    range: [0, 10],
  },
   yaxis: {
    nticks: 1,
    range: [0, 10],
  },
   zaxis: {
   nticks: 1,
   range: [0, 10],
  }},
};
Plotly.newPlot('App', data, layout);
}); */