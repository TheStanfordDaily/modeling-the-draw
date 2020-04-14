import React from 'react';
import {Button, Container, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Form from "react-jsonschema-form";
import save from "./store";

import { NumberCard } from './components/NumberCard.js'
import { CutoffGraph } from './components/CutoffGraph.js'
import { HistoryTable } from './components/HistoryTable.js'

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

const yearList = [2014, 2015, 2016, 2017, 2018, 2019, 2020];

function findLeastSquares(x_values, y_values) {
  if (x_values.length == 1 && y_values.length == 1) {
    return [0, y_values[0]]
  }

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
  let data_1718 = require('./data/housingData1718.json');
  let data_16 = require('./data/housingData16.json');
  let data_15 = require('./data/housingData15.json');
  let data_14 = require('./data/housingData14.json');
  let data_19 = require('./data/housingData19.json');

  let cutoffs = [];
  let cutoffsStr = [];

  let foundCutoff = false;
  let currData;
  let prevYears = yearList.slice(0, yearList.length - 1);

  // Loop through all past years
  for (let i = 0; i < prevYears.length; i++) {
    switch (prevYears[i]) {
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
      case 2018:
        currData = data_1718;
        break;
      default:
        currData = data_19;
    }
    foundCutoff = false;
    for (let j = 0; j < currData.length; j++) {
      let item = currData[j];
      if (item.year == prevYears[i] && (gender == "n" || item.sex == gender) && item.res_name_edited == resID) {
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
          prevYears.splice(i, 1);
          i--;
          cutoffsStr[cutoffsStr.length - 1] = "N/A";
        }
        break;
      }
    }

    if (!foundCutoff) {
      prevYears.splice(i, 1);
      i--;
      cutoffsStr.push("N/A");
    }
  }

  if (cutoffs.length > 0 && prevYears.length == cutoffs.length) {
    const ls_model = findLeastSquares(prevYears, cutoffs);
    let predictedCutoff = Math.round(ls_model[0] * des_year + ls_model[1]);
    if (predictedCutoff < 0) {
      predictedCutoff = 1;
    } else if (predictedCutoff > 3000) {
      predictedCutoff = 3000;
    }
    cutoffsStr.push(predictedCutoff);
    return {'cutoffs': cutoffsStr, 'regression': ls_model};
  }

  return {'cutoffs': null, 'regression': null}
}

function processSingleQuery(gender_raw, roomType_raw, resName_raw, tierNum_raw, applyType_raw) {
  let gender = gender_raw;
  let roomType = roomType_raw;
  const resID = roomType + "," + resName_raw;
  let typeCol = applyType_raw;
  const tierNum = tierNum_raw;

  let outputDict = {};
  let rawData = [];
  //find percentage
  const score_ceiling = tierNum * 1000;
  const score_floor = score_ceiling - 999;

  const trendsDict = processTrends(gender, typeCol, resID, yearList[yearList.length - 1]);

  // Catch bad query output
  if (trendsDict['cutoffs'] == null || trendsDict['regression'] == null) {
    return null;
  }

  const cutoffsList = trendsDict['cutoffs'];

  if (cutoffsList.length == yearList.length) {
    for (let count = 0; count < yearList.length; count++) {
      if (count == yearList.length - 1) {
        outputDict['estimate'] = cutoffsList[count];
      }

      rawData.push({'year': yearList[count], 'cutoff': cutoffsList[count]});
    }
    //find cutoff average
    let average = 0;
    let count = 0;
    for (let index = 0; index <= 4; index++) {
      if (cutoffsList[index] != "N/A") {
        average += cutoffsList[index];
        count++;
      }
    }
    average = Math.round(average / count);
    outputDict['averageCutoff'] = average;
  }

  //print out percentage
  if (cutoffsList[cutoffsList.length - 1] >= score_ceiling) {
    outputDict['chance'] = '>99%';
  } else if (cutoffsList[cutoffsList.length - 1] <= score_floor) {
    outputDict['chance'] = '<0.1%';
  } else {
    let percentage = (cutoffsList[cutoffsList.length - 1] - score_floor) / 10;
    outputDict['chance'] = `${percentage}%`;
  }

  outputDict['rawData'] = rawData;

  // Calculate points on the regression line for plotting
  const ls_model = trendsDict['regression'];
  outputDict['regressionRawData'] = yearList.map((year) => [{
    'year': year, 
    'predicted': ls_model[0] * year + ls_model[1]
  }]).flat();

  return outputDict;
}

const onError = (errors) => console.log('I have', errors.length, 'errors to fix');
const maxQueriesToPlot = 3;

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      cutoff_raw_data: yearList.map((year) => [{'year': year, 'cutoff': 'n/a'}]).flat(), //test_cutoff_data,
      regression_raw_data: yearList.map((year) => [{'year': year, 'predicted': 'n/a'}]).flat(), //test_regression_data,
      percentage: null, 
      formData: null, 
      schema: schema,
      pastQueries: [],
      // Map of indices of the queries to plot. Value is bool for whether to show numbers on the plot.
      plottedIndices: new Map(),
    }
    this.onSubmit = this.onSubmit.bind(this)

  }

  onSubmit = async ({formData}) => {
    let sex = formData.sex;
    let roomtype = formData.roomtype;
    let residence = formData.residence;
    let tiernumber = formData.tiernumber;
    let applytype = formData.applytype;
    let allResults = processSingleQuery(sex, roomtype, residence, tiernumber, applytype);

    if (allResults == null) {
      return;
    }

    let schemaProperties = this.state.schema.properties;

    let currQuery = { 
      percentage: allResults['chance'],
      cutoff_predicted: allResults['estimate'],
      cutoff_avg: allResults['averageCutoff'],

      cutoff_raw_data: allResults['rawData'],
      regression_raw_data: allResults['regressionRawData'],

      sex: schemaProperties.sex.enumNames[schemaProperties.sex.enum.indexOf(formData.sex)],
      tier: formData.tiernumber,
      residence: formData.residence,
      roomtype: formData.roomtype,
      groupsize: schemaProperties.applytype.enumNames[schemaProperties.applytype.enum.indexOf(formData.applytype)]
    };

    var newState = Object.assign({}, currQuery); // Make a copy to avoid recursive newState object
    newState.pastQueries = [].concat(this.state.pastQueries, currQuery);

    // Add most recent query to be plotted, remove oldest if over the max number to plot
    const newestIndex = newState.pastQueries.length - 1;
    newState.plottedIndices = new Map(this.state.plottedIndices);
    newState.plottedIndices.set(newestIndex, true)
    if (newState.plottedIndices.size > maxQueriesToPlot) {
      const oldestIndex = newState.plottedIndices.keys().next().value;
      newState.plottedIndices.delete(oldestIndex);
    }

    this.setState(newState);

    await save(formData);
  }


  onChange = ({formData, schema}) => {
    this.setState({formData});
    this.setState({schema});

    if (formData.residence != null) {
      let residence = formData.residence;
    
      let array = [];
      let data_1718 = require('./data/housingData1718.json');
      let data_16 = require('./data/housingData16.json');
      let data_15 = require('./data/housingData15.json');
      let data_14 = require('./data/housingData14.json');
      let data_19 = require('./data/housingData19.json');

      let dataArrays = [data_19, data_1718, data_16, data_15, data_14];

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

  handleTableTogglePlot = (index) => {
    // Make copy
    var newIndices = new Map(this.state.plottedIndices);

    // Toggle index
    if (newIndices.has(index)) { // Toggle off
      newIndices.delete(index);
    } else { // Toggle on (only if we are under the max number of indices to plot)
      if (newIndices.size < maxQueriesToPlot) newIndices.set(index, false);
    }

    this.setState({ plottedIndices: newIndices });
  }

  handleTableToggleShowNumbers = (index) => {
    this.setState( (state) => {
      return { plottedIndices: state.plottedIndices.set(index, !state.plottedIndices.get(index)) };
    })
  }

  
  render() {
    return (
      <div className="Calculator tab-content">
        <Container fluid>
        <Row>
          <Col xs={12} md={4}>
            <Form schema={this.state.schema}
              onSubmit={this.onSubmit}
              formData={this.state.formData}
              onChange={this.onChange}
              onError={onError} />
            <br/>
          </Col>
          
          <Col xs={12} md={8}>
            <Container fluid>
            <Row className="justify-content-md-center">
              <NumberCard title='Your chances' value={this.state.percentage}/>
            </Row>
            <Row>
              <CutoffGraph 
                plotData={Array.from(this.state.plottedIndices).map(x => this.state.pastQueries[x[0]])}
                shouldShowNumbers={Array.from(this.state.plottedIndices.values())}
                historicalData={this.state.cutoff_raw_data.slice(0, -1)}
                predictedData={this.state.cutoff_raw_data.slice(-1)}
                regressionData={this.state.regression_raw_data}
                tier={this.state.tier}
              />
            </Row>
            </Container>
          </Col>
        </Row>

        <HistoryTable 
          tableData={this.state.pastQueries}
          checkedRows={this.state.plottedIndices}
          togglePlot={this.handleTableTogglePlot}
          toggleShowNumbers={this.handleTableToggleShowNumbers}
        />

        </Container>
      </div>
    );
    
  }

  
}

export default Calculator;