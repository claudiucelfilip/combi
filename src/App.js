import React, { Component } from 'react';
import 'reflect-metadata';
import 'zone.js';
import logo from './logo.svg';
import './App.css';
import { Foo } from './components/Foo';
import { Bar } from './components/Bar';
import { Yarn } from './components/Yarn';

import { Angular } from './components/Angular';


class App extends Component {
  render() {
    let components = [Yarn, Bar];
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Foo />
        
        <Angular components={components}>
          <bar></bar>
          <yarn></yarn>
          <h1>Hello There</h1>
        </Angular>
        
        <Angular components={[Yarn]}>
          <h2>Another one</h2>
          <yarn></yarn>
        </Angular>
      </div>
    );
  }
}

export default App;
