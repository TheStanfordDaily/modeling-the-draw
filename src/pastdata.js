import React from 'react';
import MaterialTable from 'material-table';

const headerStyle = {
    textAlign: 'center',
    fontFamily: 'Open Sans Condensed, sans-serif',
  };

function generateData() {
    return 0;
}

class PastData extends React.Component {
    render() {
        return (
            <div>
                <h1 style={headerStyle}>View Past Data</h1>
                <MaterialTable
                    columns={[
                        { title: 'Residence', field: 'resName'},
                        { title: 'Sex', field: 'sex'},
                        { title: 'Individual', field: 'applyType1', type: 'numeric'},
                        { title: 'Group of 2', field: 'applyType2', type: 'numeric'},
                        { title: 'Group of 3', field: 'applyType3', type: 'numeric'},
                        { title: 'Group of 4', field: 'applyType4', type: 'numeric'},
                        { title: 'Year', field: 'year', type: 'numeric'},
                    ]}
                    data={[
                        { resName: 'Okada', sex: 'f', applyType1: 1000, applyType2: 1000, applyType3: 1000, applyType4: 1000, year: 2018},
                        //TODO: get data (from json/csv files)
                    ]}
                    options={{
                        filtering: true,
                    }}
                ></MaterialTable>
            </div>
        );
    }
}

export default PastData;