import React from 'react';
import {Row, Slider, Slide} from 'react-materialize'


export default class Home extends React.Component {

	render() {
		return (
			<div className="container">
			<Row style={{'margin-top':'20px'}}>
				<Slider>
					<Slide
						src={require('../img/auau.jpg')}
						title="This is our big Tagline!">
						Here's our small slogan.
					</Slide>
					<Slide
						src={require('../img/miau.jpg')}
						title="Left aligned Caption"
						placement="left">
						Here's our small slogan.
					</Slide>
					<Slide
						src={require('../img/auau_miau.jpg')}
						title="Right aligned Caption"
						placement="right">
						Here's our small slogan.
					</Slide>
				</Slider>
			</Row>
			</div>
		);
	}
}