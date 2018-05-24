import React from 'react';
import Slider from './Slider/Slider.js'


import './../css/home.css';

export default class Home extends React.Component {

	render() {
		var slideStyle = {
			width: '100%',
			height: '100%',
		};
		var dotStyle = {
			'text-align': 'center'
		};

		return (
			<div>
				<Slider />
				{
				/*
				<div style={dotStyle}>
					<span className="dot" onclick="setSlide(0)"></span>
					<span className="dot" onclick="setSlide(1)"></span>
					<span className="dot" onclick="setSlide(2)"></span>
				</div>
				*/
				}
			</div>
		);
	}
}