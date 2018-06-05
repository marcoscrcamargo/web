import React from 'react';
import {Row, Slider, Slide} from 'react-materialize'


export default class Home extends React.Component {

	// Builds a Slider with 3 images and sliding texts
	render() {
		return (
			<Row style={{'marginTop':'20px'}}>
				<Slider>
					<Slide
						src={require('../img/auau.jpg')}
						placement="right"
						title="Pet Shop!">
						Animal lovers!
					</Slide>
					<Slide
						src={require('../img/miau.jpg')}
						title="We have everything your pet needs!"
						placement="left">
						Check out our products and services!
					</Slide>
					<Slide
						src={require('../img/auau_miau.jpg')}
						title="The care your pet deserves!"
						placement="right">
						Your pet's health in first place!
					</Slide>
				</Slider>
			</Row>
		);
	}
}