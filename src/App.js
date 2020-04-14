import React, { Component, Fragment } from 'react';
import {HashRouter, Route} from 'react-router-dom';
import './App.css';
// import Home from './home';
import FAQ from './faq';
import Calculator from './calculator';
import PastData from './pastdata';

import {Tabs, Tab} from 'react-bootstrap';
import './index.css';
//import * as serviceWorker from './serviceWorker';

class App extends React.Component {
  render() {
    return (
      <Fragment>
        <Tabs fill defaultActiveKey="calculator" id="nav">
          <Tab eventKey="calculator" title="Calculator">
            <Calculator />
          </Tab>
          <Tab eventKey="past-data" title="Past Data">
            <PastData />
          </Tab>
          <Tab eventKey="faw" title="FAQ">
            <FAQ />
          </Tab>
        </Tabs>
      </Fragment>
    );
  }
}

export default App;
