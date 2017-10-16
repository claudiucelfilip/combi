import React, { Component } from 'react';
import 'reflect-metadata';
import 'zone.js';
import logo from './logo.svg';
import './App.css';
import * as Components from './components';
import { Angular } from './containers/Angular';

const components = {
  components: Object.keys(Components)
    .filter(key => key !== '__esModule')
    .filter(key => {
      const instance = new Components[key]();
      return !instance.type;
    })
    .map(key => Components[key])
}

class App extends Component {
  render () {
    
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <Angular {...components}>
          <bar></bar>
          <yarn></yarn>
          <h1>Hello There</h1>
        </Angular>

        <Angular {...components}>
          <h2>Another one</h2>
          <yarn></yarn>
        </Angular>
      </div>
    );
  }
}

export default App;
