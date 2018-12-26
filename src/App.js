import React, { Component } from 'react';
import './App.scss';
import './styles/index.scss'
import Graph from './components/Graph';

class App extends Component {
  render() {
    return (
      <div className="app">
        <main className="main-container">
          <Graph />
        </main>
      </div>
    );
  }
}

export default App;
