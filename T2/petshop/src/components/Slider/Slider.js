import React from 'react';

import Slide from './Slide.js'
import LeftArrow from './LeftArrow.js'
import RightArrow from './RightArrow.js'

import './../../css/home.css';

export default class Slider extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			slideCount: 1
		}
		this.nextSlide = this.nextSlide.bind(this)
		this.previousSlide = this.previousSlide.bind(this)
	}


	render() {
		return (
			<div className="slideshow-container">
				{/* Slides go here */}
				{this.state.slideCount == 1 ? <Slide img="auau.jpg"/> : null}
				{this.state.slideCount == 2 ? <Slide img="miau.jpg"/> : null}
				{this.state.slideCount == 3 ? <Slide img="auau_miau.jpg"/> : null}
		        {/* Arrow Functionality */}
				<RightArrow nextSlide={this.nextSlide} />
				<LeftArrow previousSlide={this.previousSlide} />
			</div>
    	);
	}

	nextSlide() {
		this.setState({ slideCount: ((this.state.slideCount) % 3) + 1 })
	}

	previousSlide() {
		this.setState({ slideCount: (this.state.slideCount == 1 ? 3 : this.state.slideCount - 1)  })
	}

}