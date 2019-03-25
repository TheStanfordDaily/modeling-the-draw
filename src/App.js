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
    },
    applytype: {
      type: "string",
      title: "Group Size: "
    }
  }
};

function processTrends(h_data, gender, typeCol, resID, des_year, simple, linear, logistic) {
  let cutoffs = [];
  let yearList = Array.from(h_data["year"]).sort();

  let i;
  for (i = 0; i < yearList.length; i++) {
    let h_data_ySlice;
    if (h_data.year == yearList[i]) {
      h_data_ySlice = h_data[yearList[i]];
    }
    let h_data_sliced;
    if (gender != "n") {
      if (h_data_ySlice.sex == gender && h_data_ySlice != null) {
        h_data_sliced = h_data_ySlice[gender];
      }
      if (h_data_sliced.res_name_edited == resID && h_data_sliced != null) {
        const cutoff_i = Array.from(h_data_sliced[resID])[0];
        cutoffs.push(h_data_sliced[cutoff_i][typeCol]);
      }
    } else {
      h_data_sliced = h_data_ySlice;
      if (h_data_sliced.res_name_edited == resID && h_data_sliced != null) {
        const cutoff_is = Array.from(h_data_sliced[resID]);
        cutoffs.push((h_data_sliced[cutoff_is[0]][typeCol] + h_data_sliced[cutoff_is[1]][typeCol]) / 2);
      }
    }
  }
  if (cutoffs.length() == 1) {
    return cutoffs[0];
  } else if (cutoffs.length() > 1 && yearList.length() == cutoffs.length()) {
    if (linear) {
      /*
      const coef = np.polyfit(yearList, cutoffs, 1);
      return Math.round(coef[0] * des_year + coef[1]);
      */
    }
  }
  return;
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
  if (data['res_name_edited'].contains(resID)) { //const h_data = pd.read_csv(data);
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
                <div>{this.state.results && `Your Chances: ${this.state.results}%` }</div> 
              </Col>
            </Row>
          </Container>
        </header>
      </div>
    );
  }
}

export default App;