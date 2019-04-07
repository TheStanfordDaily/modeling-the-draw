import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import './index.css';
import './App.css';
import Home from './home';
import FAQ from './faq';
import Calculator from './calculator';
import PastData from './pastdata';
//import * as serviceWorker from './serviceWorker';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact={true} path='/' render={() => (
            <div className="App">
              <Home />
            </div>
          )} />
          <Route exact={true} path='/faq' render={() => (
            <div className="App">
              <FAQ />
            </div>
          )} />
          <Route exact={true} path='/calculator' render={() => (
            <div className="App">
              <Calculator />
            </div>
          )} />
          <Route exact={true} path='/pastdata' render={() => (
            <div className="App">
              <PastData />
            </div>
          )} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
