import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import Form from "react-jsonschema-form";

const divStyle = {
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

const cutoffStyle = {
  fontSize: '20px', 
  textAlign: 'center',
};

const percentageStyle = {
  fontSize: '22px', 
  textAlign: 'center',
}

const allResidencesArray = [ "576 Alvarado", "680 Lomita", "Adelfa", "BOB", "Branner", "Cardenal", "Castano", "CCTH", "Columbae", 
"Crothers", "Dorm", "Durand", "EAST", "East Campus", "East FloMo", "EBF", "Eucalipto", "Faisan", 
"FloMo", "French House", "FroSoCo", "Gavilan", "Gerhard Casper Quad", "Gov Co", "Granada", "Grove", 
"Hammarskjold", "Haus Mitteleuropa", "Humanities House", "Jerry", "Kairos", "Kimball", "Lagunita", 
"Lantana", "La Casa Italiana", "Loro", "Lower Row Self Op", "Mars", "Meier", "Mirlo", "Mirrielees", 
"Muwekma", "Murray", "Naranja", "Narnia", "Norcliffe", "Okada", "Outdoor House", "Paloma", "Phi Sigma", 
"Pluto", "Potter", "Residence", "Robinson", "Roble", "Roth", "Self Op", "Self Op Lake", 
"Slavianskii Dom", "SterQuad", "Storey", "Suites", "Synergy", "Terra", "Toyon", "Trancos", "Ujamaa", 
"Upper Row Self Op", "West Campus", "West FloMo", "Xanadu", "Yost", "ZAP", "Zapata"];

const schema = {
  type: "object",
  properties: {
    sex: {
      title: "Sex:",
      enum: [ "m", "f", "n" ],
      enumNames: [ "Male", "Female", "N/A" ]
    },
    residence: {
      title: "Residence:",
      enum: allResidencesArray,
    },
    roomtype: {
      title: "Room Type:",
      enum: [ "1 Room Single", "1 Room Double", "1 Room Double (focus)", "2 Room Double", "2 Room Double (focus)", 
      "1 Room Triple", "1 Room Quad", "4-room", "6-room", "Standard", "Premier", "Substance Free Housing", 
      "Ethnic (B)", "Ethnic (I)", "Ethnic (N)", "Ethnic (C)", "Ethnic (A)", "Double", "Triple", "Quad", "Any" ],
      enumNames: [ "1 Room Single", "1 Room Double", "1 Room Double (Focus)", "2 Room Double", "2 Room Double (Focus)", 
        "1 Room Triple", "1 Room Quad", "Four-Person Suite", "Six-Person Suite", "Standard Room", "Premier Room", 
        "Substance Free Housing", "Ethnic Housing (Ujamaa)", "Ethnic Housing (Hammarskjold)", 
        "Ethnic Housing (Muwekma)", "Ethnic Housing (Zapata)", "Ethnic Housing (Okada)", "2 Bedroom Apartment", 
        "3 Bedroom Apartment", "4 Bedroom Apartment", "Any" ],
    },
    tiernumber: {
      title: "Tier Level:",
      enum: [ 1, 2, 3],
      enumNames: [ "Tier 1", "Tier 2", "Tier 3" ]
    },
    applytype: {
      title: "Group Size: ",
      enum: [ "individual", "group_2", "group_3", "group_4" ],
      enumNames: [ "Individual", "Group of 2", "Group of 3", "Group of 4" ]
    }
  },
  required: ["sex", "roomtype", "residence", "tiernumber", "applytype"],
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
  let data_1718 = require('./housingData1718.json');
  let data_16 = require('./housingData16.json');
  let data_15 = require('./housingData15.json');
  let data_14 = require('./housingData14.json');

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
      default:
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
        if (cutoffs[cutoffs.length - 1] == "" || cutoffs[cutoffs.length - 1] == null) {
          cutoffs.pop();
          yearList.splice(i, 1);
          i--;
          cutoffsStr[cutoffsStr.length - 1] = "N/A";
        }
        break;
      }
    }
    if (!foundCutoff) {
      yearList.splice(i, 1);
      i--;
      cutoffsStr.push("N/A");
    }
  }

  if (cutoffs.length == 0) {
    return "Invalid input";
  } else if (cutoffs.length == 1) {
    return cutoffs[0];
  } else if (cutoffs.length > 1 && yearList.length == cutoffs.length) {
    const ls_model = findLeastSquares(yearList, cutoffs);
    let cutoff2019 = Math.round(ls_model[0] * des_year + ls_model[1]);
    if (cutoff2019 < 0) {
      cutoff2019 = 1;
    } else if (cutoff2019 > 3000) {
      cutoff2019 = 3000;
    }
    cutoffsStr.push(cutoff2019);
    return cutoffsStr;
  }
  return 0;
}

function processSingleQuery(gender_raw, roomType_raw, resName_raw, tierNum_raw, applyType_raw) {
  let gender = gender_raw;
  let roomType = roomType_raw;
  const resID = roomType + "," + resName_raw;
  let typeCol = applyType_raw;
  const tierNum = tierNum_raw;

  let output = [];
  //find percentage
  const score_ceiling = tierNum * 1000;
  const score_floor = score_ceiling - 999;
  const cutoffsList = processTrends(gender, typeCol, resID, 2019);
  
  //print out previous cutoffs
  let yearList = [2014, 2015, 2016, 2017, 2018, 2019];
  if (cutoffsList.length == yearList.length) {
    for (let count = 0; count < yearList.length; count++) {
      if (count == yearList.length - 1) {
        output.push(yearList[count] + " estimated cutoff: " + cutoffsList[count]);
      } else {
        output.push(yearList[count] + " cutoff: " + cutoffsList[count]);
      }
    }
  }

  //print out percentage
  if (cutoffsList[cutoffsList.length - 1] >= score_ceiling) {
    output.push("Your Chances: >99% – You're an (almost) guaranteed in!");
  } else if (cutoffsList[cutoffsList.length - 1] <= score_floor) {
    output.push("Your Chances: <0.1% – Good luck with that!");
  } else {
    let percentage = (cutoffsList[cutoffsList.length - 1] - score_floor) / 10;
    output.push("Your Chances: " + percentage + "%");
  }
  return output;
}

const onError = (errors) => console.log('I have', errors.length, 'errors to fix');

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cutoff_2014: null, cutoff_2015: null, cutoff_2016: null, cutoff_2017: null,
      cutoff_2018: null, cutoff_2019: null, percentage: null, formData: null, schema: schema
    }
  }

  onSubmit = ({formData}) => {
    let sex = formData.sex;
    let roomtype = formData.roomtype;
    let residence = formData.residence;
    let tiernumber = formData.tiernumber;
    let applytype = formData.applytype;
    let results = processSingleQuery(sex, roomtype, residence, tiernumber, applytype);

    this.setState({ cutoff_2014: results[0], cutoff_2015: results[1], cutoff_2016: results[2],
      cutoff_2017: results[3], cutoff_2018: results[4], cutoff_2019: results[5], percentage: results[6]
    });
  }

  onChange = ({formData, schema}) => {
    this.setState({formData});
    this.setState({schema});

    if (formData.residence != null) {
      let residence = formData.residence;
    
      let array = [];
      let data_1718 = require('./housingData1718.json');
      let data_16 = require('./housingData16.json');
      let data_15 = require('./housingData15.json');
      let data_14 = require('./housingData14.json');

      let dataArrays = [data_1718, data_16, data_15, data_14];

      for (let i = 0; i < dataArrays.length; i++) {
        let data = dataArrays[i];
        for (let j = 0; j < data.length; j++) {
          let item = data[j];
          if (item.res_name_edited.includes(residence)) {
            let index = item.res_name_edited.indexOf(',');
            let newStr = item.res_name_edited.substring(0, index);
            if (!array.includes(newStr.trim())) {
              array.push(newStr);
            }
          }
        }
      }

      let newSchema = {
        type: "object",
        properties: {
          sex: {
            title: "Sex:",
            enum: [ "m", "f", "n" ],
            enumNames: [ "Male", "Female", "N/A" ]
          },
          residence: {
            title: "Residence:",
            enum: allResidencesArray,
          },
          roomtype: {
            title: "Room Type:",
            enum: array,
          },
          tiernumber: {
            title: "Tier Level:",
            enum: [ 1, 2, 3],
            enumNames: [ "Tier 1", "Tier 2", "Tier 3" ]
          },
          applytype: {
            title: "Group Size: ",
            enum: [ "individual", "group_2", "group_3", "group_4" ],
            enumNames: [ "Individual", "Group of 2", "Group of 3", "Group of 4" ]
          }
        },
        required: ["sex", "roomtype", "residence", "tiernumber", "applytype"],
      }
      this.setState({schema: newSchema});
    }
  }

  render() {
    return (
      <div className="Calculator" style={divStyle}>
        <header className="Calculator-header" style={calculatorStyle}>
          <br />
            <Link to="/"><Button variant="outline-danger">
              Back
            </Button></Link>
          <br />
          <br />
          <h1 style={headerStyle}>Calculator</h1>
            <Form schema={this.state.schema}
              onSubmit={this.onSubmit}
              formData={this.state.formData}
              //onChange={({formData}) => this.setState({formData}) }
              onChange={this.onChange}
              onError={onError} />
            <br />
            <div style={cutoffStyle}> {this.state.cutoff_2014} </div>
            <div style={cutoffStyle}> {this.state.cutoff_2015} </div>
            <div style={cutoffStyle}> {this.state.cutoff_2016} </div>
            <div style={cutoffStyle}> {this.state.cutoff_2017} </div>
            <div style={cutoffStyle}> {this.state.cutoff_2018} </div>
            <div style={cutoffStyle}> {this.state.cutoff_2019} </div>
            <br />
            <div style={percentageStyle}> {this.state.percentage} </div> 
          <br />
          <br />
        </header>
      </div>
    );
  }
}

export default Calculator;