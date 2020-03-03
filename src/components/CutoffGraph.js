import React, { Component } from 'react';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, 
	YAxis, Label, LabelList, ReferenceArea, ReferenceLine } from 'recharts';

const tierToYRange = {
	1: {
		'y1': 0,
		'y2': 1000
	},
	2: {
		'y1': 1000,
		'y2': 2000
	},
	3: {
		'y1': 2000,
		'y2': 3000
	},
};

export class CutoffGraph extends Component {
	renderLabel = (props) => {
	  const {x, y, value} = props;
	  if (isNaN(y)) return;
	  const labelY = y > 30 ? -10 : 30; // Place label above or below dot
	  return (
	    <g transform={`translate(${x},${y})`}>
	      <text x={5} y={labelY} textAnchor="middle">{value}</text>
	    </g>
	   );
	};

	renderTierLabel = () => {
		return (
			<Label 
				value={`Tier ${this.props.tier}`} 
				position='center'
			/>
		);
	}

	renderReferenceArea = () => {
		if (this.props.tier) {
			return (
				<ReferenceArea 
					y1={tierToYRange[this.props.tier]['y1']} 
					y2={tierToYRange[this.props.tier]['y2']}
				>
					<Label 
						value={`Tier ${this.props.tier}`} 
						position='left'
						offset={10}
					/>
				</ReferenceArea>
			);
		} else {
			return;
		}
	}

	render() {
		return (
			<ResponsiveContainer width='100%' height={400}>
				<ScatterChart margin={{ top: 0, right: 20, left: 20, bottom: 20 }}>
					{ this.renderReferenceArea() }
          <ReferenceLine y={1000} stroke='#B5B5B5' strokeDasharray='6 6'/>
          <ReferenceLine y={2000} stroke='#B5B5B5' strokeDasharray='6 6'/>

          <Scatter data={this.props.data} name="Cutoff" stroke="#8C1515" fill="#8C1515">
            <LabelList dataKey="cutoff" content={this.renderLabel} />
          </Scatter>

          <XAxis className='axis' dataKey='year' tickMargin={5}/>
          <YAxis 
            className='axis'
            dataKey="cutoff" 
            reversed={true} 
            domain={[0, 3000]} 
            padding={{ top: 5, bottom: 0 }}
            interval="preserveStartEnd"
            ticks={[0, 1000, 2000, 3000]}
            tickMargin={5}
          >
            <Label angle={-90} offset={0} value='Cutoff' position='insideLeft'/>
          </YAxis>
        </ScatterChart>
      </ResponsiveContainer>
		);
	}
}