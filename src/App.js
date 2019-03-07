import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
//import Flexbox from 'flexbox-react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//import Button from 'react-bootstrap/Button';
import logo from './logo.svg';
import './App.css';
import Form from "react-jsonschema-form";

const schema = {
  title: "Calculator",
  type: "object",
  required: ["sex", "roomtype", "residence", "tiernumber"],
  properties: {
    sex: {
      type: "string", 
      title: "Sex (F or M):"
    },
    roomtype: {
      type: "string", 
      title: "Room Type:"
    },
    residence: {
      type: "string", 
      title: "Residence:"
    },
    tiernumber: {
      type: "integer", 
      title: "Tier #:",
      maxLength: 1
    }
  }
};

const log = (type) => console.log.bind(console, type);

const onSubmit = ({formData}, e) => console.log("Data submitted: ", formData);
const onError = (errors) => console.log("I have", errors.length, "errors to fix");

/* calculate percentage based on form data */
function calculatePercentage(props) {
  return <h1>{props.name}</h1>;
}

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Container>
            <Row>
              <Col>
                <Form schema={schema}
                  onChange={log("changed")}
                  onSubmit={onSubmit}
                  onError={onError} />
              </Col>
              <Col>
                <calculatePercentage name = "100"/>
              </Col>
            </Row>
          </Container>
        </header>
      </div>
    );
  }
}

export default App;