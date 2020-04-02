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
								<th>Residence</th>
								<th>Room Type</th>
								<th>Predicted cutoff</th>
								<th>Average cutoff</th>
								<th>Your chances</th>
							</tr>
						</thead>

						<tbody>
							{this.props.tableData.map((history, i) => 
		            <tr key={i}>
			            <td>{history.residence}</td>
			            <td>{history.roomtype}</td>
			            <td>{history.cutoff_predicted}</td>
			            <td>{history.cutoff_avg}</td>
			            <td>{history.percentage}</td>
		            </tr>
							)}
						</tbody>
					</Table>

				</Container>
			);
		}
	}
}