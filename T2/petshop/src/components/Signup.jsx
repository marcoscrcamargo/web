import React from 'react';
import {Row, Col, Input, Button} from 'react-materialize';

export default class Signup extends React.Component {
	render(){
		let styleCol = {
			'margin-top': '20px',
		}

		return(
			<Col s={8} m={8} l={8} className="center" style={styleCol}>
				<h4>Signup !</h4>
				<Row><Col s ={8} m={8} l={8} offset="s4 m4 l4"><Input s={6} m={6} l={6} type="text" label="Full Name" validate /></Col></Row>
				<Row><Col s ={8} m={8} l={8} offset="s4 m4 l4"><Input s={6} m={6} l={6} type="tel" label="Phone Number" validate /></Col></Row>
				<Row><Col s ={8} m={8} l={8} offset="s4 m4 l4"><Input s={6} m={6} l={6} type="text" label="Username" validate /></Col></Row>
				<Row><Col s ={8} m={8} l={8} offset="s4 m4 l4"><Input s={6} m={6} l={6} type="email" label="Email" validate /></Col></Row>
				<Row><Col s ={8} m={8} l={8} offset="s4 m4 l4"><Input s={6} m={6} l={6} type="password" label="Password" validate /></Col></Row>
				<Row><Col s ={8} m={8} l={8} offset="s4 m4 l4"><Input s={6} m={6} l={6} type="text" label="Adress" validate /></Col></Row>
				<Row><Button waves='light'>Upload a photo</Button></Row>
				<Row><Button waves='light'>Signup</Button></Row>
			</Col>
		)
	}
}