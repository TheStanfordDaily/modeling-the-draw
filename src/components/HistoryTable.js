import React, { Component, Fragment } from 'react';
import {Button, Container, Row, Col, Table} from 'react-bootstrap';

export class HistoryTable extends Component {
	render() {
		if (this.props.tableData.length == 0) {
			return (
				<Container fluid id="history-table">
					<h2 className="text-center">Your history will show up here.</h2>
				</Container>
			);
		} else {
			return (
				<Container fluid id="history-table">
					<Row>
						<Col><h2>Your History</h2></Col>
						<Col className="text-right">
							<Button onClick={() => window.location.reload(false)} variant="outline-danger">
								Clear
							</Button>
						</Col>
					</Row>

					<Table striped bordered hover>
						<thead>
							<tr>
								<th>Sex</th>
								<th>Residence</th>
								<th>Room type</th>
								<th>Tier</th>
								<th>Group size</th>
								<th>Predicted cutoff</th>
								<th>Your chances</th>
								<th>Plot</th>
							</tr>
						</thead>

						<tbody>
							{this.props.tableData.map((history, i) => 
		            <tr key={i}>
		            	<td>{history.sex}</td>
			            <td>{history.residence}</td>
			            <td>{history.roomtype}</td>
			            <td>{history.tier}</td>
			            <td>{history.groupsize}</td>
			            <td>{history.cutoff_predicted}</td>
			            <td>{history.percentage}</td>
			            <td>
			            	<input
			            		type='checkbox' 
			            		onChange={() => {this.props.onCheck(i)}}
			            		checked={this.props.checkedRows.includes(i)}
			            	/>
			            </td>
		            </tr>
							)}
						</tbody>
					</Table>

				</Container>
			);
		}
	}
}