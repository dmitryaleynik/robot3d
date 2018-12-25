import React, { Component } from 'react';
import './App.scss';
import './styles/index.scss'
import Graph from './components/Graph';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
            <Graph />
        </header>
      </div>
    );
  }
}

export default App;
