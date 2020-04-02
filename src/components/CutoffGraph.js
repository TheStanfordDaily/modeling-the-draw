import React, { Component, Fragment } from 'react';
import { ResponsiveContainer, ComposedChart, Scatter, Line, XAxis, 
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
	};

	renderReferenceArea = () => {
		if (this.props.tier) {
			return (
				<ReferenceArea 
					y1={tierToYRange[this.props.tier]['y1']} 
					y2={tierToYRange[this.props.tier]['y2']}
					fill='#ddd'
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
	};

	renderEmptyState = () => {
		const dataValues = this.props.historicalData.map((x) => x['cutoff']);
		const isEmptyData = dataValues.every((x) => isNaN(x));

		if (isEmptyData) {
			return (
				<ReferenceArea y1={0} y2={3000} fill='#fff' fillOpacity={0.7}>
					<Label value={"Fill out the form to calculate your draw chances!"}/>
				</ReferenceArea>
			)
		} else {
			return;
		}
	};

	render() {
		return (
			<ResponsiveContainer width='100%' height={400}>
				<ComposedChart margin={{ top: 0, right: 20, left: 20, bottom: 20 }}>
					{ /* Reference area and lines for showing tiers */ }
					{ this.renderReferenceArea() }
          <ReferenceLine y={1000} stroke='#B5B5B5' strokeDasharray='6 6'/>
          <ReferenceLine y={2000} stroke='#B5B5B5' strokeDasharray='6 6'/>

          { this.renderEmptyState() }

    			{ /* Least squares regression line */ }
		      <Line 
		      	data={this.props.regressionData}
		      	dataKey="predicted" 
		      	stroke="#EFB7B7"
		      	strokeWidth='3'
		      	strokeDasharray = '10 10' 
		      	dot={false} 
						activeDot={false} 
						legendType="none"
					/>

					{ /* Scatter dots for historical and predicted cutoff numbers */ }
		      <Scatter data={this.props.historicalData} name="Cutoff" stroke="#8C1515" fill="#8C1515">
		        <LabelList dataKey="cutoff" content={this.renderLabel} />
		      </Scatter>

		      <Scatter data={this.props.predictedData} name="Predicted" stroke="#8C1515" strokeWidth="2" fill="#EFB7B7">
		        <LabelList dataKey="cutoff" content={this.renderLabel} />
		      </Scatter>	      

		    	{ /* Axes */ }
          <XAxis className='axis' dataKey='year' tickMargin={5} allowDuplicatedCategory={false}/>

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
            <Label angle={-90} offset={0} value='Cutoff Draw Number' position='insideLeft'/>
          </YAxis>
        </ComposedChart>
      </ResponsiveContainer>
		);
	}
}
