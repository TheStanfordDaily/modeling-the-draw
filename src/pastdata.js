import React from 'react';
import MUIDataTable from 'mui-datatables';

const divStyle = {
    //backgroundColor: '#FAF7B3',
};

const headerStyle = {
    textAlign: 'center',
    color: '#8c1515',
    fontFamily: 'Open Sans Condensed, sans-serif',
};

class PastData extends React.Component {
    render() {
        const columns = [
            {
                name: "res_name_edited",
                label: "Residence",
                options: { filter: true, sort: true }
            },
            {
                name: "sex",
                label: "Sex",
                options: { filter: true, sort: false }
            },
            {
                name: "individual",
                label: "Individual",
                options: { filter: false, sort: true }
            },
            {
                name: "group_2",
                label: "Group of 2",
                options: { filter: false, sort: true }
            },
            {
                name: "group_3",
                label: "Group of 3",
                options: { filter: false, sort: true }
            },
            {
                name: "group_4",
                label: "Group of 4",
                options: { filter: false, sort: true }
            },
            {
                name: "year",
                label: "Year",
                options: { filter: true, sort: true }
            }
        ];

        const data = require('./housingData_all.json');

        const options = {
            filterType: 'checkbox',
            responsive: 'scroll',
        };

        return (
            <div style={divStyle}>
                <br />
                <h1 style={headerStyle}>View Past Data</h1>
                <MUIDataTable
                    data={data}
                    columns={columns}
                    options={options}
                />
            </div>

        );
    }
}

export default PastData;