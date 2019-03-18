import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MonitorLinkCharts from './reactLinkTree';


class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
        <MonitorLinkCharts />
        </div>
      </div>
    );
  }
}

export default App;
