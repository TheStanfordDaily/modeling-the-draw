import React from 'react';
import MUIDataTable from 'mui-datatables';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';

const headerStyle = {
    textAlign: 'center'
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

        const data = require('./data/housingData_all.json');

        const options = {
            filterType: 'checkbox',
            responsive: 'scroll',
            selectableRows: 'true',
            print: 'false',
            download: 'false',
            isRowSelectable: (dataIndex) => {
                return false;
            },
            onRowsDelete: (rowsDeleted) => {
                return;
            }
        };

        return (
            <div className='tab-content'>
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