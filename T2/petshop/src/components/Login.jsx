import React from 'react';
import {Row, Col, Input, Button} from 'react-materialize';

export default class Login extends React.Component{
	render() {
		let styleLoginRow = {
			'font-size': 'small',
			'text-align': 'left'

		}
		let styleLoginLink = {
			'margin-left': '10px',
		}

		return(
			<Col s={8} m={8} l={8} className="center">
				<Row><Col s ={8} m={8} l={8} offset="s4 m4 l4"><Input s={6} m={6} l={6} type="text" label="Username" /></Col></Row>
				<Row style={styleLoginRow}><Col s ={8} m={8} l={8} offset="s4 m4 l4"><a style={styleLoginLink}>Sign Up</a></Col></Row>
				<Row><Col s ={8} m={8} l={8} offset="s4 m4 l4"><Input s={6} m={6} l={6} type="password" label="Password" /></Col></Row>
				<Row style={styleLoginRow}><Col s ={8} m={8} l={8} offset="s4 m4 l4"><a style={styleLoginLink}>Forgot Password?</a></Col></Row>
				<Row><Button waves='light'>Login</Button></Row>
			</Col>
		);
	}
}