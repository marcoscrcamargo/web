import React from 'react';
import './../../css/home.css';

const SlideOne = (props) => {
	return (
		<div className="slides fade">
			<img className="img-slide" src={require('../../img/'+props.img)} />
		</div>
	);
}

export default SlideOne;