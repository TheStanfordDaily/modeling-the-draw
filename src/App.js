import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
//import Flexbox from 'flexbox-react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//import Button from 'react-bootstrap/Button';
import './App.css';
import Form from "react-jsonschema-form";
//import CsvParse from '@vtex/react-csv-parse';
// eslint-disable-next-line import/no-webpack-loader-syntax
import data from "csv-loader!./housingData1718_cleaned.csv";

const schema = {
  title: "Calculator",
  type: "object",
  required: ["sex", "roomtype", "residence", "tiernumber", "applytype"],
  properties: {
    sex: {
      type: "string", 
      title: "Sex:"
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
    },
    applytype: {
      type: "string",
      title: "Group Size: "
    }
  }
};

function findLeastSquares(x_values, y_values) {
  let x_sum = 0;
  let y_sum = 0;
  let xsq_sum = 0;
  let xy_sum = 0;
  let count = 0;

  for (let i = 0; i < x_values.length; i++) {
    let x = x_values[i];
    let y = y_values[i];

    x_sum += x;
    y_sum += y;
    xsq_sum += (x * x);
    xy_sum += (x * y);
    count++;
  }

  let aValue = ( (count * xy_sum) - (x_sum * y_sum) ) / ( (count * xsq_sum) - (x_sum * x_sum) );
  let bValue = ( (y_sum * xsq_sum) - (x_sum * xy_sum) ) / ( (count * xsq_sum) - (x_sum * x_sum) );

  return [aValue, bValue];  
}


function processTrends(h_data, gender, typeCol, resID, des_year, simple, linear, logistic) {
  let cutoffs = [];
  let yearList = [2018]; //should actually be "let yearList = [2015, 2016, 2018]"

  let i;
  for (i = 0; i < yearList.length; i++) {
    let h_data_yearSlice = h_data["year" == yearList[i]];
    
    /*
    let h_data_genderSlice;
    if (gender != "n") {
      h_data_genderSlice = h_data_yearSlice["sex" == gender];
      const cutoff_i = h_data_genderSlice["res_name_edited" == resID]; //assuming that there is only one item matching this
      cutoffs.push(h_data_genderSlice[cutoff_i][typeCol]);
    } else {
      h_data_genderSlice = h_data_yearSlice;
      const cutoff_is = h_data_genderSlice["res_name_edited" == resID];
      cutoffs.push((h_data_genderSlice[cutoff_is[0]][typeCol] + h_data_genderSlice[cutoff_is[1]][typeCol]) / 2);
    }
    */
  }

  if (cutoffs.length == 1) {
    return cutoffs[0];
  } else if (cutoffs.length > 1 && yearList.length == cutoffs.length) {
    const ls_model = findLeastSquares(yearList, cutoffs);
    return Math.round(ls_model[0] * des_year + ls_model[1]);
  }
  return 0;
}

/* sex, roomtype, residence, tiernumber, applytype */
function processSingleQuery(sex, roomtype, residence, tiernumber, applytype) {
  const gender_raw = sex;
  const roomType_raw = roomtype;
  const resName_raw = residence;
  const tierNum_raw = tiernumber;
  const applyType_raw = applytype;

  /* gender */
  let gender;
  switch(gender_raw) {
    case 'male' :
      gender = 'm';
      break;
    case 'female':
      gender = 'f';
      break;
    default:
      gender = 'n';
  }

  /* room type + residence */
  let roomType;

  switch(roomType_raw) {
    case 'a 1 room single':
      roomType = '1 Room Single';
      break;
    case 'a 1 room double':
      roomType = '1 Room Double';
      break;
    case 'a 1 room double (focus)' :
      roomType = '1 Room Double (focus)';
      break;
    case 'a 2 room double' :
      roomType = '2 Room Double';
      break;
    case 'a 2 room double (focus)' : 
      roomType = '2 Room Double (focus)';
      break;
    case 'a triple ' : 
      roomType = 'Triple';
      break;
    case 'a standard room ' : 
      roomType = 'Standard';
      break;
    case 'a premium room ' :
      roomType = 'Premium';
      break;
    case 'substance free housing ' :
      roomType = 'Substance Free Housing';
      break;
    case 'ethnic housing ' :
      roomType = 'ETHNIC';
      break;
    default:
      roomType = 'Any';
  }
  if (roomType == "ETHNIC") {
    switch (resName_raw) {
      case 'Ujamaa':
        roomType = 'Ethnic' + 'B';
        break;
      case 'Hammarskjold':
        roomType = 'Ethnic' + 'I';
        break;
      case 'Muwekma':
        roomType = 'Ethnic' + 'N';
        break;
      case 'Zapata':
        roomType = 'Ethnic' + 'C';
        break;
      case 'Okada':
        roomType = 'Ethnic' + 'A';
        break;
    }
  }
  const resID = roomType + "," + resName_raw;

  /* applytype (number of ppl in group) */
  let typeCol;
  switch (applyType_raw) {
    case 'an individual':
      typeCol = 'individual';
      break;
    case 'a group of 2':
      typeCol = 'group_2';
      break;
    case 'a group of 3':
      typeCol = 'group_3';
      break;
    case 'a group of 4':
      typeCol = 'group_4';
      break;
  }

  /* tier number */
  const tierNum = tierNum_raw;
  
  let output = '';

  /* find percentage */
  const score_ceiling = tierNum * 1000;
  const score_floor = score_ceiling - 999;

  const cutoff = processTrends(data, gender, typeCol, resID, 2019, false, true, false);

  if (cutoff > score_ceiling) {
    output = '>99';
  } else if (cutoff < score_floor) {
    output = '<0.1';
  } else {
    output = (cutoff - score_floor) / 1000;
  }

  return output;
}

const log = (type) => console.log.bind(console, type);

const onError = (errors) => console.log('I have', errors.length, 'errors to fix');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: null
    }
  }

  onSubmit = ({formData}) => {
    const sex = JSON.stringify(formData.sex, null, 2);
    const roomtype = JSON.stringify(formData.roomtype, null, 2);
    const residence = JSON.stringify(formData.residence, null, 2);
    const tiernumber = JSON.stringify(formData.tiernumber, null, 2);
    const applytype = JSON.stringify(formData.applytype, null, 2);

    this.setState({results: processSingleQuery(sex, roomtype, residence, tiernumber, applytype)});
  }

  /*
  handleData = data => {
    this.setState({data})
  }
  */

  render() {
    return (
      <div className="App">
        <header className="App-header">

          <Container>
            <Row>
              <Col>
                <Form schema={schema}
                onChange={log("changed")}
                onSubmit={this.onSubmit}
                formData={this.formData}
                onError={onError} />
              </Col>
              <Col>
                <div>{this.state.results && `Your Chances: ${this.state.results}` }</div> 
              </Col>
            </Row>
          </Container>
        </header>
      </div>
    );
  }
}

export default App;