import React from 'react';

const LeftArrow = (props) => {
	return (
		<a className="prev" onClick={props.previousSlide}>&#10094;</a>
	);
}

export default LeftArrow;