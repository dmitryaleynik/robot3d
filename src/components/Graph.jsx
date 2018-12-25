import React from 'react';
import Plot from 'react-plotly.js';
import map from 'lodash/map';
import get from 'lodash/get';
import countries from './points';
import PointForm from './PointForm';
import getColor from '../helpers/getColor';

class Graph extends React.Component {
  constructor (props) {
    super(props);

    const data = {
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

    this.state = {
      data: [data],
      isVisiblePointForm: false,
      selectedPointIndex: -1,
    };
  }

  handleClick = (event) => {
    debugger;
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
            layout={ {width: 1000, height: 800, title: 'A Fancy Plot'} }
            onClick={this.handleClick}
          />
        </div>
        {isVisiblePointForm && <PointForm handleSubmit={this.handleSubmit}/>}
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