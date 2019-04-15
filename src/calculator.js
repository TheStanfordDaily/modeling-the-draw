import React, { Component } from 'react';
import Form from "react-jsonschema-form";
//import Grid from '@material-ui/core/Grid';

const divStyle = {
  //backgroundColor: '#F7ADBB',
  marginLeft: '20%',
  marginRight: '20%',
  border: "solid #8c1515",
  borderWidth: '4px',
}

const headerStyle = {
  textAlign: 'center',
  color: '#8c1515',
  fontFamily: 'Open Sans Condensed, sans-serif',
};

const calculatorStyle = {
  marginLeft: '20%',
  marginRight: '20%',
};

const answerStyle = {
  fontSize: '20px',
};

const schema = {
  //title: "Calculator",
  type: "object",
  required: ["sex", "roomtype", "residence", "tiernumber", "applytype"],
  properties: {
    sex: {
      type: "string", 
      title: "Sex:",
      enum: [ "male", "female", "n" ],
      enumNames: [ "Male", "Female", "N/A" ]
    },
    roomtype: {
      type: "string", 
      title: "Room Type:",
      enum: [ "1 room single", "1 room double", "1 room double (focus)", "2 room double", 
        "2 room double (focus)", "1 room triple", "1 room quad", "4-person", "6-person", "standard room",
        "premier room", "substance free housing", "ethnic housing",
        "2 bedroom apartment", "3 bedroom apartment", "4 bedroom apartment", "Any" ],
      enumNames: [ "1 Room Single", "1 Room Double", "1 Room Double (Focus)", "2 Room Double",
        "2 Room Double (Focus)", "1 Room Triple", "1 Room Quad", "Four-Person Suite", "Six-Person Suite",
        "Standard Room", "Premier Room", "Substance Free Housing", "Ethnic Housing",
        "2 Bedroom Apartment", "3 Bedroom Apartment", "4 Bedroom Apartment", "Any" ]
    },
    residence: {
      type: "string", 
      title: "Residence:",
      enum: [ "576 Alvarado", "680 Lomita", "Adelfa", "BOB", "Branner", "Cardenal", "Castano", "CCTH", 
        "Columbae", "Crothers", "Dorm", "Durand", "EAST", "East Campus", "East FloMo", "EBF", "Eucalipto", 
        "Faisan", "FloMo", "French House", "FroSoCo", "Gavilan", "Gerhard Casper Quad", "Gov Co", "Granada", 
        "Grove", "Hammarskjold", "Haus Mitteleuropa", "Humanities House", "Jerry", "Kairos", "Kimball", 
        "Lagunita", "Lantana", "La Casa Italiana", "Loro", "Lower Row Self Op", "Mars", "Meier", "Mirlo", 
        "Mirrielees", "Muwekma", "Murray", "Naranja", "Narnia", "Norcliffe", "Okada", "Outdoor House", 
        "Paloma", "Phi Sigma", "Pluto", "Potter", "Residence", "Robinson", "Roble", "Roth", "Self Op", 
        "Self Op Lake", "Slavianskii Dom", "SterQuad", "Storey", "Suites", "Synergy", "Terra", "Toyon", 
        "Trancos", "Ujamaa", "Upper Row Self Op", "West Campus", "West FloMo", "Xanadu", "Yost", 
        "ZAP", "Zapata"],
        enumNames: [ "576 Alvarado", "680 Lomita", "Adelfa", "BOB", "Branner", "Cardenal", "Castano", "CCTH", 
        "Columbae", "Crothers", "Dorm", "Durand", "EAST", "East Campus", "East FloMo", "EBF", "Eucalipto", 
        "Faisan", "FloMo", "French House", "FroSoCo", "Gavilan", "Gerhard Casper Quad", "Gov Co", "Granada", 
        "Grove", "Hammarskjold", "Haus Mitteleuropa", "Humanities House", "Jerry", "Kairos", "Kimball", 
        "Lagunita", "Lantana", "La Casa Italiana", "Loro", "Lower Row Self Op", "Mars", "Meier", "Mirlo", 
        "Mirrielees", "Muwekma", "Murray", "Naranja", "Narnia", "Norcliffe", "Okada", "Outdoor House", 
        "Paloma", "Phi Sigma", "Pluto", "Potter", "Residence", "Robinson", "Roble", "Roth", "Self Op", 
        "Self Op Lake", "Slavianskii Dom", "SterQuad", "Storey", "Suites", "Synergy", "Terra", "Toyon", 
        "Trancos", "Ujamaa", "Upper Row Self Op", "West Campus", "West FloMo", "Xanadu", "Yost", 
        "ZAP", "Zapata"],

    },
    tiernumber: {
      type: "integer", 
      title: "Tier Level:",
      maxLength: 1,
      enum: [ 1, 2, 3],
      enumNames: [ "Tier 1", "Tier 2", "Tier 3" ]
    },
    applytype: {
      type: "string",
      title: "Group Size: ",
      enum: [ "individual", "group of 2", "group of 3", "group of 4" ],
      enumNames: [ "Individual", "Group of 2", "Group of 3", "Group of 4" ]
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

function processTrends(gender, typeCol, resID, des_year) {
  const data_1718 = require('./housingData1718.json');
  const data_16 = require('./housingData16.json');
  const data_15 = require('./housingData15.json');
  const data_14 = require('./housingData14.json');

  let cutoffs = [];
  let cutoffsStr = [];
  let yearList = [2014, 2015, 2016, 2017, 2018];

  let foundCutoff = false;

  let currData;
  for (let i = 0; i < yearList.length; i++) {
    switch (yearList[i]) {
      case 2014:
        currData = data_14;
        break;
      case 2015:
        currData = data_15;
        break;
      case 2016:
        currData = data_16;
        break;
      case 2017:
        currData = data_1718;
        break;
      case 2018:
        currData = data_1718;
    }
    foundCutoff = false;
    for (let j = 0; j < currData.length; j++) {
      let item = currData[j];
      if (item.year == yearList[i] && (gender == "n" || item.sex == gender) && item.res_name_edited == resID) {
        foundCutoff = true;
        switch (typeCol) {
          case "individual":
            cutoffs.push(item.individual);
            cutoffsStr.push(item.individual);
            break;
          case "group_2":
            cutoffs.push(item.group_2);
            cutoffsStr.push(item.group_2);
            break;
          case "group_3":
            cutoffs.push(item.group_3);
            cutoffsStr.push(item.group_3);
            break;
          case "group_4":
            cutoffs.push(item.group_4);
            cutoffsStr.push(item.group_4);
        }
        if (cutoffs[cutoffs.length - 1] == "") {
          cutoffs.pop();
          cutoffsStr[cutoffs.length - 1] = "N/A";
          foundCutoff = false;
        }
        break;
      }
    }
    if (!foundCutoff) {
      yearList.splice(i, 1);
      i--;
      if (cutoffsStr[cutoffs.length - 1] != "N/A") {
        cutoffsStr.push("N/A");
      }
    }
  }

  if (cutoffs.length == 0) {
    return "Invalid input";
  } else if (cutoffs.length == 1) {
    return cutoffs[0];
  } else if (cutoffs.length > 1 && yearList.length == cutoffs.length) {
    const ls_model = findLeastSquares(yearList, cutoffs);
    let cutoff2019 = Math.round(ls_model[0] * des_year + ls_model[1]);
    cutoffsStr.push(cutoff2019);
    return cutoffsStr;
  }

  return 0;
}

function processSingleQuery(gender_raw, roomType_raw, resName_raw, tierNum_raw, applyType_raw) {

  /* gender */
  let gender;
  switch(gender_raw) {
    case "male":
      gender = "m";
      break;
    case "female":
      gender = "f";
      break;
    default:
      gender = "n";
  }

  /* room type + residence */
  let roomType;
  switch(roomType_raw) {
    case "1 room single":
      roomType = "1 Room Single";
      break;
    case "1 room double":
      roomType = "1 Room Double";
      break;
    case "1 room double (focus)":
      roomType = "1 Room Double (focus)";
      break;
    case "2 room double":
      roomType = "2 Room Double";
      break;
    case "2 room double (focus)":
      roomType = "2 Room Double (focus)";
      break;
    case "1 room triple": 
      roomType = "1 Room Triple";
      break;
    case "1 room quad":
      roomType = "1 Room Quad";
      break;
    case "4-person":
      roomType = "4-room";
      break;
    case "6-person":
      roomType = "6-room";
      break;
    case "standard room": 
      roomType = "Standard";
      break;
    case "premier room":
      roomType = "Premier";
      break;
    case "substance free housing":
      roomType = "Substance Free Housing";
      break;
    case "ethnic housing":
      roomType = "ETHNIC";
      break;
    case "2 bedroom apartment":
      roomType = "Double";
      break;
    case "3 bedroom apartment":
      roomType = "Triple";
      break;
    case "4 bedroom apartment":
      roomType = "Quad";
      break;
    default:
      roomType = "Any";
  }
  if (roomType == "ETHNIC") {
    switch (resName_raw) {
      case "Ujamaa":
        roomType = "Ethnic (B)";
        break;
      case "Hammarskjold":
        roomType = "Ethnic (I)";
        break;
      case "Muwekma":
        roomType = "Ethnic (N)";
        break;
      case "Zapata":
        roomType = "Ethnic (C)";
        break;
      case "Okada":
        roomType = "Ethnic (A)";
        break;
    }
  }
  const resID = roomType + "," + resName_raw;

  /* applytype (number of ppl in group) */
  let typeCol;
  switch (applyType_raw) {
    case "individual":
      typeCol = "individual";
      break;
    case "group of 2":
      typeCol = "group_2";
      break;
    case "group of 3":
      typeCol = "group_3";
      break;
    case "group of 4":
      typeCol = "group_4";
      break;
    default :
      return "Invalid input";
  }

  /* tier number */
  const tierNum = tierNum_raw;
  if (tierNum != 1 && tierNum != 2 && tierNum != 3) {
    return "Invalid input";
  }

  //TODO: move everything below to state

  let output = '';
  /* find percentage */
  const score_ceiling = tierNum * 1000;
  const score_floor = score_ceiling - 999;
  const cutoffsList = processTrends(gender, typeCol, resID, 2019);

  //print out previous cutoffs
  let yearList = [2014, 2015, 2016, 2017, 2018, 2019];
  if (cutoffsList.length == yearList.length) {
    for (let count = 0; count < yearList.length; count++) {
      output += yearList[count] + " cutoff: " + cutoffsList[count];
    }
  }

  //print out percentage
  if (cutoffsList[cutoffsList.length - 1] > score_ceiling) {
    output += "Your Chances: >99%";
  } else if (cutoffsList[cutoffsList.length - 1] < score_floor) {
    output += "Your Chances: <0.1%";
  } else {
    let percentage = (score_ceiling - cutoffsList[cutoffsList.length - 1]) / 10;
    output += "Your Chances: " + percentage + "%";
  }

  return output;
}

const log = (type) => console.log.bind(console, type);

const onError = (errors) => console.log('I have', errors.length, 'errors to fix');

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: null
    }
  }

  onSubmit = ({formData}) => {
    let sex = formData.sex;
    let roomtype = formData.roomtype;
    let residence = formData.residence;
    let tiernumber = formData.tiernumber;
    let applytype = formData.applytype;

    this.setState({results: processSingleQuery(sex, roomtype, residence, tiernumber, applytype)});
  }

  render() {
    return (
      <div className="Calculator" style={divStyle}>
        <header className="Calculator-header" style={calculatorStyle}>
          <br />
          <h1 style={headerStyle}>Calculator</h1>
            <Form schema={schema}
              onChange={log("changed")}
              onSubmit={this.onSubmit}
              formData={this.formData}
              onError={onError} />
              <br />
            <div style={answerStyle}>
              {this.state.results}
            </div> 
          <br />
          <br />
        </header>
      </div>
    );
  }
}

export default Calculator;

/*
{this.state.results && `Your Chances: ${this.state.results}%` }
*/