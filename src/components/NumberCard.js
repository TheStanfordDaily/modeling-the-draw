import React, { Component } from 'react';

const divStyle = {
	height: '7em',
	// backgroundColor: '#E5E5E5',
	textAlign: 'center',
	padding: '10px',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center'
};

const titleStyle = {
	textAlign: 'center',
	margin: 0
};

const valueStyle = {
	textAlign: 'center',
	color: '#8C1515',
	margin: 0,
	fontSize: '3em',
	height: '1.2em',
	fontWeight: 'bold'
}

export class NumberCard extends Component {
	render() {
		return (
			<div style={divStyle}>
				<div>
					<p style={titleStyle}>{this.props.value ? this.props.title : ''}</p>
					<p style={valueStyle}>{this.props.value}</p>
				</div>
			</div>
		);
	}
}