import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//import Flexbox from 'flexbox-react';
//import Container from 'react-bootstrap/Container';
//import Row from 'react-bootstrap/Row';
//import Col from 'react-bootstrap/Col';
//import Button from 'react-bootstrap/Button';
import logo from './logo.svg';
import './App.css';

import Form from "react-jsonschema-form";

const schema = {
  title: "Calculator",
  type: "object",
  required: ["gender", "roomtype", "residence", "tiernumber"],
  properties: {
    gender: {type: "string", title: "Gender:"},
    roomtype: {type: "string", title: "Room Type:"},
    residence: {type: "string", title: "Residence:"},
    tiernumber: {type: "string", title: "Tier #:"} //TODO: change to a checkbox
  }
};

const log = (type) => console.log.bind(console, type);

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          <Form schema={schema}
                onChange={log("changed")}
                onSubmit={log("submitted")}
                onError={log("errors")} />
          
        </header>
      </div>
    );
  }
}

export default App;