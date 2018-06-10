import React from 'react';
import {Row, Col, Input, Button} from 'react-materialize';

export default class ForgotPassword extends React.Component {
	render(){
		let styleCol = {
			'marginTop': '20px',
		}

		return(
			<Col s={8} m={8} l={8} className="center" style={styleCol}>
				<h4>Recover your Password</h4>
				<Row>
					{/*A input box for the user's email*/}
					<Col s ={8} m={8} l={8} offset="s1 m1 l1" className="valign-wrapper">
						<Input s={6} m={6} l={6} type="email" label="Email" validate />
						<Button  className="sleek-grey">Submit</Button>
					</Col>
				</Row>
			</Col>
		)
	}
}