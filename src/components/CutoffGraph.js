import React, { Component, Fragment } from 'react';
import { ResponsiveContainer, ComposedChart, Scatter, Line, XAxis, 
	YAxis, Label, LabelList, ReferenceArea, ReferenceLine } from 'recharts';
import graphColors from '../helpers/GraphColors.js'

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
	renderLabel = (props, i) => {
		if (i != this.props.plotData.length - 1) {
			return;
		}

		const {x, y, value} = props;
		if (isNaN(y)) return;
		const labelY = y > 30 ? -10 : 30; // Place label above or below dot
		return (
			<g transform={`translate(${x},${y})`}>
				<text x={5} y={labelY} textAnchor="middle" fill={graphColors[i].dark}>
					{value}
				</text>
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
					{ /* this.renderReferenceArea() */ }
					<ReferenceLine y={1000} stroke='#B5B5B5' strokeDasharray='6 6'/>
					<ReferenceLine y={2000} stroke='#B5B5B5' strokeDasharray='6 6'/>

					{ this.renderEmptyState() }

					{ /* Least squares regression line and scatter dots for cutoff numbers */ }
					{
						this.props.plotData.map((data, i) => {
							console.log(data);
							return (
								[
								<Line 
									data={data.regression_raw_data}
									dataKey="predicted" 
									stroke={graphColors[i].light}
									strokeWidth='3'
									strokeDasharray = '10 10' 
									dot={false} 
									activeDot={false} 
									legendType="none"
									isAnimationActive={false}
								/>,

								<Scatter 
									data={data.cutoff_raw_data.slice(0, -1)} name="Cutoff" isAnimationActive={false}
									stroke={graphColors[i].dark} fill={graphColors[i].dark}>
									<LabelList dataKey="cutoff" content={(args) => {return this.renderLabel(args, i)}} />
								</Scatter>,

								<Scatter 
									data={data.cutoff_raw_data.slice(-1)} name="Predicted" isAnimationActive={false}
									stroke={graphColors[i].dark} strokeWidth="2" fill={graphColors[i].light}>
									<LabelList dataKey="cutoff" content={(args) => {return this.renderLabel(args, i)}} />
								</Scatter>
								]
							);
						})
					}					

					{ /* Axes */ }
					<XAxis className='axis' dataKey='year' tickMargin={5} allowDuplicatedCategory={false}>
						<Label value="Year" position='bottom'/>
					</XAxis>

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
						<Label className="y-axis-label" angle={-90} value='Cutoff Draw Number' position='insideLeft'/>
					</YAxis>
				</ComposedChart>
			</ResponsiveContainer>
		);
	}
}
